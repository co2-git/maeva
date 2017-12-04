import getType from './getType';

const shape = (object) => {
  return {
    convert: (value, options = {}) => new Promise(async (resolve, reject) => {
      try {
        if (!value || typeof value !== 'object') {
          return value;
        }
        const converted = {};
        for (const key in value) {
          const type = getType(object[key]);
          converted[key] = type.convert(value[key], options);
          if (converted[key] instanceof Promise) {
            await converted[key];
          }
        }
        resolve(converted);
      } catch (error) {
        reject(error);
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
  };
};

export default shape;
