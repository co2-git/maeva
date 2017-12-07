import getType from './getType';

const arrayType = (type) => ({
  name: 'array',
  convert: (array, options = {}) => {
    if (Array.isArray(array)) {
      return array.map(item => getType(type).convert(item, options));
    }
    return array;
  },
  validate: (array) => {
    if (!Array.isArray(array)) {
      throw new Error('Expecting an array');
    }
    array.forEach(getType(type).validate);
  }
});

export default arrayType;
