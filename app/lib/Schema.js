// @flow
import _ from 'lodash';
import maeva from './Connection';
import Field from './Field';
import {Embed as embed} from './Type';
import MaevaError from './Error';
import isObject from './utils/isObject';

export default class Schema {
  constructor(schema: Object = {}) {
    for (const field in schema) {
      try {
        let structure = schema[field];
        // {field: Type}
        if (_.isFunction(schema[field])) {
          structure = {type: schema[field]};
        // {field: new Schema}
        } else if (schema[field] instanceof this) {
          structure = {type: embed(schema[field])};
        // {field: {type: new Schema}}
        } else if (schema[field].type instanceof this) {
          structure = {
            ...schema[field],
            type: embed(schema[field].type),
          };
        }
        Object.assign(this, {[field]: new Field(structure)});
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
            valid: this[field].validate(document[field]),
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
        converted[field] = this[field].convert(document[field]);
      }
    }
    return converted;
  }
}
