// @flow
import Field from '../Field';
import Schema from '../Schema';
import MaevaError from '../Error';
import maeva from '../..';
import printSchema from '../utils/printSchema';

export default function set(field: string, value: any, schema: Schema): any {
  try {
    // get field structure from schema
    let structure: Field = schema[field];
    // throw if field not found in schema
    if (!structure) {
      throw new MaevaError(MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA, {
        field, value, schema, structure,
        code: MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA,
      });
    }
    // throw if field is not a Field
    if (!(structure instanceof Field)) {
      throw new MaevaError(MaevaError.EXPECTED_A_FIELD, {
        field, value, schema, structure,
        code: MaevaError.EXPECTED_A_FIELD,
      });
    }
    // Deal with embedded documents
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
    // Deal with meta queries
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const [metaQuery] = Object.keys(value);
      if (/^\$/.test(metaQuery)) {
        switch (metaQuery) {
        case '$not':
          return {$not: set(field, value.$not, schema)};
        }
      }
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
        throw new MaevaError(MaevaError.FIELD_VALIDATOR_FAILED, {
          field, value, schema, structure,
        });
      }
    }
    return converted;
  } catch (error) {
    throw MaevaError.rethrow(error, 'Could not set field', {
      field, value, schema: printSchema(schema),
    });
  }
}
