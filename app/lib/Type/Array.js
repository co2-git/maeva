// @flow

import _ from 'lodash';
import Schema from '../Schema';
import {set} from './set';
import associate from './associate';
import embed from './Embed';

export default function _Array(_type: Function|Schema) {
  const type = associate(
    _type instanceof Schema ? embed(_type) : _type
  );
  const maevaArray = () => type;
  maevaArray.isMaevaArray = true;
  maevaArray.type = _type;
  maevaArray.validate = (value: any): boolean =>
    _.isArray(value) && value.every(type.validate);
  maevaArray.convert = (value: any): any => {
    if (!_.isArray(value)) {
      return value;
    }
    return value.map(type.convert);
  };
  maevaArray.set = (value: any): any => set(value, maevaArray);
  return maevaArray;
}
