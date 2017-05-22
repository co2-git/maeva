// @flow
import map from 'lodash/map';
import isArray from 'lodash/isArray';
import every from 'lodash/every';
import MaevaType from './defs/MaevaType';
import getType from './getType';

const mixedType = (...types) => {
  const mixedTypes = map(types, getType);
  return new MaevaType({
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
