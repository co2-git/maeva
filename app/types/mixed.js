import map from 'lodash/map';
import isArray from 'lodash/isArray';
import every from 'lodash/every';

import getType from './getType';

const mixedType = (...types) => {
  const mixedTypes = map(types, getType);
  return {
    convert: (items) =>{
      if (!isArray(items)) {
        return items;
      }
      return map(items, (value, index) => mixedTypes[index].convert(value));
    },
    validate: (items) => (
      isArray(items) &&
      every(items, (item, index) => mixedTypes[index].validate(item))
    ),
  };
};

export default mixedType;
