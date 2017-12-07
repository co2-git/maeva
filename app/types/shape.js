import getType from './getType';

const shape = (object) => ({
  name: 'shape',
  convert: (value, options = {}) => {
    if (!value || typeof value !== 'object') {
      throw new Error('Shape must be an object to convert');
    }
    const converted = {};
    for (const key in value) {
      if (/\./.test(key)) {
        const keys = key.split(/\./);
        const updatedKeys = [...keys];
        updatedKeys.shift();
        const updatedValue = {[updatedKeys[0]]: value[key]};
        const updatedShape = object[keys[0]];
        const type = updatedShape;
        converted[key] = type.convert(updatedValue, options)[updatedKeys[0]];
      } else {
        const type = getType(object[key]);
        converted[key] = type.convert(value[key], options);
      }
    }
    return converted;
  },

  validate: (value, options = {}) => {
    if (!value || typeof value !== 'object') {
      throw new Error('Expected an object');
    }
    for (const key in value) {
      const type = getType(object[key]);
      type.validate(value[key], options);
    }
  }
});

export default shape;
