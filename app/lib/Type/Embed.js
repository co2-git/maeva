// @flow

import Schema from '../Schema';
import {set} from './set';

export default function Embed(_schema: Schema|Object) {
  const schema = _schema instanceof Schema ? _schema : new Schema(_schema);
  const maevaEmbeddedSchema = () => schema;
  maevaEmbeddedSchema.isEmbeddedSchema = true;
  maevaEmbeddedSchema.embeddedSchema = schema;
  maevaEmbeddedSchema.validate = ::schema.validate;
  maevaEmbeddedSchema.convert = ::schema.convert;
  maevaEmbeddedSchema.set = (value: any): any =>
    set(value, maevaEmbeddedSchema);
  return maevaEmbeddedSchema;
}
