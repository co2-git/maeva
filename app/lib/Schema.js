// @flow
import _ from 'lodash';
import maeva from './Connection';
import Field from './Field';
import {
  Embed as embed,
  Array as array,
  Tuple as tuple,
} from './Type';
import MaevaError from './Error';
import Model from './Model';
import isObject from './utils/isObject';

export default class Schema {
  $links: {[fieldDotName: string]: Model};
  constructor(schema: Object = {}) {
    Object.defineProperty(this, '$links', {
      enumerable: false,
      value: {},
      writable: true,
    });
    for (const field in schema) {
      try {
        let structure = schema[field];
        // {field: Type}
        if (_.isFunction(schema[field])) {
          structure = {type: schema[field]};
        // {field: Array(1)}
        } else if (_.isArray(schema[field])) {
          if (schema[field].length === 1) {
            structure = {type: array(schema[field][0])};
          } else if (schema[field].length > 1) {
            structure = {type: tuple(...schema[field])};
          }
        // {field: new Schema}
        } else if (
          isObject(schema[field]) &&
          schema[field] instanceof this.constructor
        ) {
          structure = {type: embed(schema[field])};
        // {field: {type: new Schema}}
        } else if (
          schema[field].type &&
          !_.isFunction(schema[field].type) &&
          schema[field].type instanceof this.constructor
        ) {
          structure = {
            ...schema[field],
            type: embed(schema[field].type),
          };
        // {field: {type: Array(1)}}
        } else if (
          schema[field].type &&
          !_.isFunction(schema[field].type) &&
          _.isArray(schema[field].type)
        ) {
          if (schema[field].type.length === 1) {
            structure = {
              ...schema[field],
              type: array(schema[field].type[0]),
            };
          } else if (schema[field].type.length > 1) {
            structure = {
              ...schema[field],
              type: tuple(...schema[field].type),
            };
          }
        }
        Object.assign(this, {[field]: new Field(structure)});
        if (this.get(field).$type.isMaevaModel) {
          this.$links[field] = this.get(field).$type;
        }
      } catch (error) {
        throw MaevaError.rethrow(
          error,
          MaevaError.FAILED_BUILDING_SCHEMA_FIELD,
          {schema, field},
        );
      }
    }
  }
  validate(document: Object): boolean {
    if (!isObject(document)) {
      return false;
    }
    // tackle native
    if (
      document instanceof Date ||
      document instanceof RegExp ||
      document instanceof Error
    ) {
      maeva.events.emit('warning', new MaevaError(
        MaevaError.JAVASCRIPT_NATIVE_OBJECTS_ARE_NOT_SCHEMAS,
        {
          ['new Schema().validate()']: {
            document,
            schema: this.toJSON(),
            type: document.constructor.name,
          }
        }
      ));
      return false;
    }
    const fields = {};
    for (const field in document) {
      try {
        if (!(field in this)) {
          maeva.events.emit('warning', new MaevaError(
            MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA,
            {document, field, schema: this}
          ));
          fields[field] = {
            valid: false,
            reason: MaevaError.errorMessages[
              MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA
            ],
          };
        } else {
          fields[field] = {
            valid: this.get(field).validate(document[field]),
          };
        }
      } catch (error) {
        throw MaevaError.rethrow(
          error,
          MaevaError.FAILED_BUILDING_SCHEMA_FIELD,
          {document, field, schema: this},
        );
      }
    }
    const valid = [];
    for (const field in fields) {
      valid.push(fields[field].valid);
    }
    // ignore missing fields that are not required
    for (const field in this) {
      if (!(field in fields)) {
        if (this.get(field).isRequired()) {
          maeva.events.emit('warning', new MaevaError(
            MaevaError.MISSING_REQUIRED_FIELD,
            {document, field, schema: this},
          ));
        } else {
          valid.push(true);
        }
      }
    }
    if (valid.length !== Object.keys(this).length) {
      return false;
    }
    return valid.every(field => field);
  }
  convert(document: Object): Object {
    if (!isObject(document)) {
      maeva.events.emit('warning', new MaevaError(
        'Could not convert non-object to schema',
        {document, schema: this.toJSON()}
      ));
      return document;
    }
    const converted = {};
    for (const field in document) {
      if (!(field in this)) {
        maeva.events.emit('warning', new MaevaError(
          MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA,
          {document, field, schema: this.toJSON()}
        ));
      } else {
        converted[field] = this.get(field).convert(document[field]);
      }
    }
    // apply default
    for (const field in this) {
      if (!(field in converted) && this.get(field).hasDefault()) {
        converted[field] = this.get(field).convert(this.get(field).default);
      }
    }
    return converted;
  }
  get(field: string): Field {
    const flattenSchema = this.flatten();
    if (!(field in flattenSchema)) {
      throw new MaevaError(MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA, {
        field, schema: this.toJSON(),
      });
    }
    return flattenSchema[field];
  }
  toJSON(): Object {
    const schema = {};
    for (const field in this) {
      schema[field] = this.get(field).toJSON();
    }
    return schema;
  }
  flatten(): {[dotNotation: string]: Field} {
    function _flattenEmbedded(fieldName, schema)
    : {[dotNotation: string]: Field} {
      const flat = {};
      for (const embeddedFieldName in schema) {
        flat[`${fieldName}.${embeddedFieldName}`] =
          schema[embeddedFieldName];
        if (schema[embeddedFieldName].type.isEmbeddedSchema) {
          Object.assign(flat, _flattenEmbedded(
            `${fieldName}.${embeddedFieldName}`,
            schema[embeddedFieldName].type.embeddedSchema,
          ));
        }
      }
      return flat;
    }
    function _flatten(schema: Schema): {[dotNotation: string]: Field} {
      const flat = {};
      for (const fieldName in schema) {
        const field = schema[fieldName];
        flat[fieldName] = field;
        if (field.type.isEmbeddedSchema) {
          Object.assign(flat, _flattenEmbedded(
            fieldName,
            field.type.embeddedSchema,
          ));
        }
      }
      return flat;
    }
    return _flatten(this);
  }
  getLinks(): {[dotNotation: string]: Model} {
    const flat = this.flatten();
    const links = {};
    for (const field in flat) {
      if (flat[field].isLink()) {
        links[field] = flat[field].type;
      }
    }
    return links;
  }
  getRequired(): {[dotNotation: string]: Field} {
    const flat = this.flatten();
    const required = {};
    for (const field in flat) {
      if (flat[field].isRequired()) {
        required[field] = flat[field];
      }
    }
    return required;
  }
  getDefault(): {[dotNotation: string]: Field} {
    const flat = this.flatten();
    const _default = {};
    for (const field in flat) {
      if (flat[field].hasDefault()) {
        _default[field] = flat[field];
      }
    }
    return _default;
  }
  getValidators(): {[dotNotation: string]: Field} {
    const flat = this.flatten();
    const validators = {};
    for (const field in flat) {
      if (flat[field].hasValidator()) {
        validators[field] = flat[field];
      }
    }
    return validators;
  }
  getEmbedded(): {[dotNotation: string]: Field} {
    const flat = this.flatten();
    const embedded = {};
    for (const field in flat) {
      if (flat[field].isEmbedded()) {
        embedded[field] = flat[field];
      }
    }
    return embedded;
  }
}
