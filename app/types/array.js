import getType from './getType';

const arrayType = (type) => {
  const _type = getType(type);
  return {
    name: {array: _type.name},
    convert: (array, options = {}) => {
      if (Array.isArray(array)) {
        return array.map(item => _type.convert(item, options));
      }
      return array;
    },
    validate: (array) => {
      if (!Array.isArray(array)) {
        throw new Error('Expecting an array');
      }
      array.forEach(_type.validate);
    },
  };
};

export default arrayType;
