// @flow

import _ from 'lodash';
import Schema from '../Schema';
import {set} from './set';
import associate from './associate';
import embed from './embed';

export default function Tuple(..._types: Array<Function|Schema>): Function {
  const types = _types.map(_type => associate(
    _type instanceof Schema ? embed(_type) : _type
  ));
  const fn = () => types;
  fn.validate = (value: any): boolean => {
    if (!_.isArray(value)) {
      return false;
    }
    if (value.length !== types.length) {
      return false;
    }
    for (let index = 0; index < value.length; index++) {
      if (!types[index].validate(value[index])) {
        return false;
      }
    }
    return true;
  };
  fn.convert = (value: any): any => {
    if (!_.isArray(value)) {
      return value;
    }
    if (value.length !== types.length) {
      return value;
    }
    const converted = [];
    for (let index = 0; index < value.length; index++) {
      converted.push(types[index].convert(value[index]));
    }
    return converted;
  };
  fn.set = (value: any): any => set(value, fn);
  return fn;
}
