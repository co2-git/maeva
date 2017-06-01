// @flow
import map from 'lodash/map';
import isArray from 'lodash/isArray';
import every from 'lodash/every';
import DataType from '../defs/DataType';
import getType from './getType';

const mixedType = (...types: Array<Function | DataType>) => {
  const mixedTypes = map(types, getType);
  return new DataType({
    convert: (items: any): any[] | any =>{
      if (!isArray(items)) {
        return items;
      }
      return map(items, (value, index) => mixedTypes[index].convert(value));
    },
    validate: (items: any[] | any): boolean => (
      isArray(items) &&
      every(items, (item, index) => mixedTypes[index].validate(item))
    ),
  });
};

export default mixedType;
