import map from 'lodash/map';
import getType from './getType';

const tuple = (...types) => {
  const _types = map(types, getType);
  return {
    convert(array) {
      if (!Array.isArray(array)) {
        return array;
      }
      return array.map((value, index) => _types[index].convert(value));
    },
    validate(array) {
      if (!Array.isArray(array)) {
        throw new TypeError('Expecting an array');
      }
      array.every((item, index) => _types[index].validate(item));
    },
  };
};

export default tuple;
