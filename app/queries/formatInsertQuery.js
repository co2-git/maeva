import getType from '../types/getType';
import formatInsertQueryValue from './formatInsertQueryValue';

const formatInsertQuery = (doc, model, options = {}) => {
  const formatted = {};

  for (const field in doc) {
    if (field in model.fields) {
      const type = getType(model.fields[field]);
      const value = doc[field];
      formatted[field] = formatInsertQueryValue(value, type, options);
    }
  }

  return {
    ...doc,
    ...formatted
  };
};

export default formatInsertQuery;
