import getType from './getType';

const shape = (object) => ({
  name: 'shape',
  convert: (value, options = {}) => new Promise(async (resolve) => {
    try {
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
          const _converted = type.convert(updatedValue, options);
          if (_converted instanceof Promise) {
            converted[key] = await _converted;
          } else {
            converted[key] = _converted;
          }
          converted[key] = converted[key][updatedKeys[0]];
        } else {
          const type = getType(object[key]);
          converted[key] = type.convert(value[key], options);
          if (converted[key] instanceof Promise) {
            await converted[key];
          }
        }
      }
      resolve(converted);
    } catch (error) {
      resolve(value);
    }
  }),

  validate: (value, options = {}) => new Promise(async (resolve, reject) => {
    try {
      if (!value || typeof value !== 'object') {
        return value;
      }
      for (const key in value) {
        const type = getType(object[key]);
        const validated = type.convert(value[key], options);
        if (validated instanceof Promise) {
          await validated;
        }
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  }),
});

export default shape;
