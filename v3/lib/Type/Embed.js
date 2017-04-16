// @flow

import Schema from '../Schema';
import {set} from './set';

export default function Embed(_schema: Schema | $fields): Function {
  const schema = _schema instanceof Schema ? _schema : new Schema(_schema);
  const maevaEmbeddedSchema = (): Schema => schema;
  maevaEmbeddedSchema.isEmbeddedSchema = true;
  maevaEmbeddedSchema.embeddedSchema = schema;
  maevaEmbeddedSchema.validate = schema.validate.bind(schema);
  maevaEmbeddedSchema.convert = schema.convert.bind(schema);
  maevaEmbeddedSchema.set = (value: any): any =>
    set(value, maevaEmbeddedSchema);
  return maevaEmbeddedSchema;
}
