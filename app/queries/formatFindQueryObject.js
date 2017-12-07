import first from 'lodash/first';

import getType from '../types/getType';
import formatFindQueryValue from './formatFindQueryValue';

const formatFindQueryObject = (query, model, options = {}) => {
  const converted = {};

  for (const field in query) {
    const value = query[field];
    if (field in model.fields) {
      const type = getType(model.fields[field]);
      converted[field] = formatFindQueryValue(value, type, options);
    } else if (/\./.test(field)) {
      const fields = field.split(/\./);
      const realField = first(fields);
      if (realField in model.fields) {
        const type = getType(model.fields[realField]);
        converted[field] = formatFindQueryValue(value, type, options);
      }
    }
  }

  return converted;
};

export default formatFindQueryObject;
