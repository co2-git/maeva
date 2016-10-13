// @flow
import _ from 'lodash';
import flatten from 'flat';
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
  validate(document: Object = {}): boolean {
    if (!isObject(document)) {
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
    if (valid.length !== Object.keys(this).length) {
      return false;
    }
    return valid.every(field => field);
  }
  convert(document: Object = {}): Object {
    const converted = {};
    for (const field in document) {
      if (!(field in this)) {
        maeva.events.emit('warning', new MaevaError(
          MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA,
          {document, field, schema: this}
        ));
      } else {
        converted[field] = this.get(field).convert(document[field]);
      }
    }
    return converted;
  }
  get(field: string): Field {
    if (!(field in this)) {
      throw new MaevaError(MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA, {
        field, schema: this,
      });
    }
    return this[field];
  }
  toJSON(): Object {
    const schema = {};
    for (const field in this) {
      schema[field] = this.get(field).toJSON();
    }
    return schema;
  }
  flatten(): {[dotNotation: string]: Field} {
    return flatten(this.toJSON());
  }
}
