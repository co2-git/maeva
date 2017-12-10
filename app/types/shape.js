import getType from './getType';

const shape = (object) => {
  const name = {shape: {}};
  for (const field in object) {
    name.shape[field] = getType(object[field]).name;
  }
  return {
    name,
    convert: (value, options = {}) => {
      if (!value || typeof value !== 'object') {
        return value;
      }
      const converted = {};
      for (const key in value) {
        const type = getType(object[key]);
        converted[key] = type.convert(value[key], options);
      }
      return converted;
    },
    get: () => object,
    validate: (value, options = {}) => {
      if (!value || typeof value !== 'object') {
        throw new Error('Expected an object');
      }
      for (const key in value) {
        const type = getType(object[key]);
        type.validate(value[key], options);
      }
    }
  };
};

export default shape;
