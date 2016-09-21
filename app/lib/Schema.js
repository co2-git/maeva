// @flow
import _ from 'lodash';
import Field from './Field';
import MaevaError from './Error';
import set from './Model/set';

function validate(object: Object, schema: Schema) {
  for (const field in object) {
    set(field, object[field], schema);
  }
}

function convert(object, schema) {
  const converted = {};
  for (const field in object) {
    converted[field] = set(field, object[field], schema);
  }
  return converted;
}

export default class Schema {
  static validate(value: any): boolean {
    return value instanceof this;
  }
  static convert(value: any): Schema|any {
    return value && typeof value === 'object' ? new this(value) : value;
  }
  constructor(schema: Object) {
    for (const field in schema) {
      try {
        let structure;
        if (_.isFunction(schema[field])) {
          structure = new Field({type: schema[field]});
        } else if (schema[field] instanceof Schema) {
          const embedded = (value) => value;
          embedded.embeddedMaevaSchema = schema[field];
          embedded.validate = (value: any) => {
            validate(value, schema[field]);
            return true;
          };
          embedded.convert =
            (value: any) => convert(value, schema[field]);
          structure = new Field({type: embedded});
        } else if (schema[field].type instanceof Schema) {
          const embedded = (value) => value;
          embedded.embeddedMaevaSchema = schema[field].type;
          embedded.validate = (value: any) => {
            validate(value, schema[field].type);
            return true;
          };
          embedded.convert =
            (value: any) => convert(value, schema[field].type);
          structure = new Field({
            ...schema[field],
            type: embedded,
          });
        } else if (typeof schema[field].type === 'function') {
          structure = new Field(schema[field]);
        } else {
          throw new MaevaError(MaevaError.INVALID_FIELD_SYNTAX, {
            field: {[field]: schema[field]},
          });
        }
        Object.assign(this, {[field]: structure});
      } catch (error) {
        throw MaevaError.rethrow(
          error,
          'Could not build schema field',
          {field, code: MaevaError.FAILED_BUILDING_SCHEMA_FIELD},
        );
      }
    }
  }
}
