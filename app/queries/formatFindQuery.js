import keys from 'lodash/keys';
import first from 'lodash/first';
import convertValue from '../types/convertValue';
import getType from '../types/getType';

const formatFields = (query, model, options = {}) =>
new Promise(async (resolve, reject) => {
  try {
    const converted = {};

    for (const field in query) {
      const value = query[field];
      if (field in model.fields) {
        const type = getType(model.fields[field]);
        converted[field] = await convertFieldForFind(value, type, options);
      } else if (/\./.test(field)) {
        const fields = field.split(/\./);
        const realField = first(fields);
        if (realField in model.fields) {
          const type = getType(model.fields[realField]);
          converted[field] = await convertFieldForFind(value, type, options);
        }
      }
    }

    resolve(converted);
  } catch (error) {
    reject(error);
  }
});

const formatFunction = (query, model, options = {}) =>
new Promise(async (resolve, reject) => {
  try {

  } catch (error) {
    reject(error);
  }
});

const formatFindQuery = (query = {}, model, options = {}) =>
new Promise(async (resolve, reject) => {
  try {
    const type = typeof query;
    switch (type) {
    case 'object':
      resolve(await formatFields(query, model, options));
      break;
    case 'function':
      resolve(await formatFunction(query, model, options));
      break;
    default:
      throw new Error(
        `Find query must be either an object or a function (got ${type})`
      );
    }
  } catch (error) {
    reject(error);
  }
});

export default formatFindQuery;
