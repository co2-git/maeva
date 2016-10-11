// @flow

import Schema from '../Schema';
import {set} from './set';

export default function Embed(schema: Schema) {
  const fn = () => schema;
  fn.validate = ::schema.validate;
  fn.convert = ::schema.convert;
  fn.set = (value: any): any => set(value, fn);
  return fn;
}
