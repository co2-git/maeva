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
  constructor(schema: Object = {}) {
    for (const fieldName in schema) {
      let field;
      try {
        field = schema[fieldName];
        // {field: Type}
        if (_.isFunction(schema[fieldName])) {
          field = {type: schema[fieldName]};
        // {field: Array(1)}
        } else if (_.isArray(schema[fieldName])) {
          if (schema[fieldName].length === 1) {
            field = {type: array(schema[fieldName][0])};
          } else if (schema[fieldName].length > 1) {
            field = {type: tuple(...schema[fieldName])};
          }
        // {field: new Schema}
        } else if (
          isObject(schema[fieldName]) &&
          schema[fieldName] instanceof this.constructor
        ) {
          field = {type: embed(schema[fieldName])};
        // {field: {type: new Schema}}
        } else if (
          schema[fieldName].type &&
          !_.isFunction(schema[fieldName].type) &&
          schema[fieldName].type instanceof this.constructor
        ) {
          field = {
            ...schema[fieldName],
            type: embed(schema[fieldName].type),
          };
        // {field: {type: Array(1)}}
        } else if (
          schema[fieldName].type &&
          !_.isFunction(schema[fieldName].type) &&
          _.isArray(schema[fieldName].type)
        ) {
          if (schema[fieldName].type.length === 1) {
            field = {
              ...schema[fieldName],
              type: array(schema[fieldName].type[0]),
            };
          } else if (schema[fieldName].type.length > 1) {
            field = {
              ...schema[fieldName],
              type: tuple(...schema[fieldName].type),
            };
          }
        }
        Object.assign(this, {[fieldName]: new Field(field)});
      } catch (error) {
        throw new MaevaError(
          error,
          MaevaError.FAILED_BUILDING_SCHEMA_FIELD,
          this,
          field,
          {input: {field: fieldName, schema}},
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
        {document},
        this,
        document.constructor,
      ));
      return false;
    }
    const fields = {};
    for (const field in document) {
      try {
        if (!(field in this)) {
          maeva.events.emit('warning', new MaevaError(
            MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA,
            {document, field},
            this,
          ));
          fields[field] = {
            valid: false,
            reason: 'could not find field in schema',
          };
        } else {
          fields[field] = {
            valid: this.get(field).validate(document[field]),
          };
        }
      } catch (error) {
        throw new MaevaError(
          error,
          MaevaError.FAILED_BUILDING_SCHEMA_FIELD,
          {document, field},
          this,
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
            this,
            {document, field},
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
        {document},
        this,
      ));
      return document;
    }
    const converted = {};
    for (const field in document) {
      if (!(field in this)) {
        maeva.events.emit('warning', new MaevaError(
          MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA,
          {document, field},
          this,
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
      throw new MaevaError(
        MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA,
        {field},
        this,
      );
    }
    return flattenSchema[field];
  }
  toJSON(): $Schema$JSON {
    const schema = {};
    for (const field in this) {
      // $FlowFixMe: suppressing this error until we can refactor
      schema[field] = this[field].toJSON();
    }
    return schema;
  }
  flatten(): {[dotNotation: string]: Field} {
    function _flattenEmbedded(
      fieldName: string,
      schema: Schema): {[dotNotation: string]: Field} {
      const flat = {};
      for (const embeddedFieldName in schema) {
        flat[`${fieldName}.${embeddedFieldName}`] =
          schema.get(embeddedFieldName);
        if (schema.get(embeddedFieldName).type.isEmbeddedSchema) {
          Object.assign(flat, _flattenEmbedded(
            `${fieldName}.${embeddedFieldName}`,
            schema.get(embeddedFieldName).type.embeddedSchema,
          ));
        }
      }
      return flat;
    }
    function _flatten(schema: Schema): {[dotNotation: string]: Field} {
      const flat = {};
      for (const fieldName in schema) {
        // $FlowFixMe: suppressing this error until we can refactor
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
