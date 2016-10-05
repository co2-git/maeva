// @flow
import Field from '../Field';
import Schema from '../Schema';
import MaevaError from '../Error';
import maeva from '../..';
import printSchema from '../utils/printSchema';

export default function set(field: string, value: any, schema: Schema): any {
  try {
    let structure: Field = schema[field];
    if (!structure) {
      throw new MaevaError(MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA, {
        field, value, schema, structure,
        code: MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA,
      });
    }
    if (!(structure instanceof Field)) {
      throw new MaevaError(MaevaError.EXPECTED_A_FIELD, {
        field, value, schema, structure,
        code: MaevaError.EXPECTED_A_FIELD,
      });
    }
    if (structure.type.embeddedMaevaSchema) {
      const embedded = {};
      for (const embeddedField in value) {
        try {
          embedded[embeddedField] = set(
            embeddedField,
            value[embeddedField],
            schema[field].type.embeddedMaevaSchema,
          );
        } catch (error) {
          maeva.events.emit('warning', error);
        }
      }
      return embedded;
    }
    if (typeof structure.convert !== 'function') {
      throw new MaevaError(MaevaError.FIELD_HAS_NO_CONVERTER, {
        field, value, schema, structure,
      });
    }
    if (typeof structure.validate !== 'function') {
      throw new MaevaError(MaevaError.FIELD_HAS_NO_VALIDATOR, {
        field, value, schema, structure,
      });
    }
    const converted = structure.convert(value);
    if (!structure.validate(converted)) {
      throw new Error(MaevaError.FAILED_CONVERTING_FIELD_VALUE, {
        field, value, schema, structure,
      });
    }
    if (structure.validator) {
      if (!structure.validator(converted)) {
        throw new MaevaError();
      }
    }
    return converted;
  } catch (error) {
    throw MaevaError.rethrow(error, 'Could not set field', {
      field, value, schema: printSchema(schema),
    });
  }
}
