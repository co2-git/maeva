// @flow
import Field from '../Field';
import Schema from '../Schema';

type FIELD = string | Object;

export default function set(field: FIELD, value: any, schema: Schema): any {
  const structure: Field = schema[field];
  if (!structure) {
    throw new Error(`Unknown field: ${field}`);
  }
  if (structure.$type instanceof Schema) {
    const embedded = {};
    for (const embeddedField in value) {
      embedded[embeddedField] = set(
        embeddedField,
        value[embeddedField],
        schema,
      );
    }
    return embedded;
  }
  const converted = structure.convert(value);
  if (!structure.validate(converted)) {
    throw new Error(`Unvalid value for field ${field}`);
  }
  return converted;
}
