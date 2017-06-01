// @flow
import map from 'lodash/map';
import DataType from '../defs/DataType';
import getType from './getType';

const tuple = (...types: Array<Function | DataType>) => {
  const _types = map(types, getType);
  return new DataType({
    convert(array: any): any[] | any {
      if (!Array.isArray(array)) {
        return array;
      }
      return array.map((value, index) => _types[index].convert(value));
    },

    validate(array: any): boolean {
      if (!Array.isArray(array)) {
        return false;
      }
      return array.every((item, index) => _types[index].validate(item));
    },
  });
};

export default tuple;
