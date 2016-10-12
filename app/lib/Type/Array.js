// @flow

import _ from 'lodash';
import Schema from '../Schema';
import {set} from './set';
import associate from './associate';
import embed from './embed';

export default function Array(_type: Function|Schema) {
  const type = associate(
    _type instanceof Schema ? embed(_type) : _type
  );
  const fn = () => type;
  fn.validate = (value: any): boolean =>
    _.isArray(value) && value.every(type.validate);
  fn.convert = (value: any): any => {
    if (!_.isArray(value)) {
      return value;
    }
    return value.map(type.convert);
  };
  fn.set = (value: any): any => set(value, fn);
  return fn;
}
