import 'babel-polyfill';
import getType from '../types/getType';
import convertValue from './convertValue';

const convertFieldsForInsert = async (doc, model, options = {}) => {
  const converted = {};

  for (const field in doc) {
    if (field in model.fields) {
      const type = getType(model.fields[field]);
      const value = doc[field];
      converted[field] = await convertValue(value, type, options);
    }
  }

  return {
    ...doc,
    ...converted
  };
};

export default convertFieldsForInsert;
