import getType from '../types/getType';
import formatFindQueryValue from './formatFindQueryValue';

const destructureShape = (field, value, model) => {
  const fields = field.split(/\./);
  let type;
  let getter = model.fields;
  for (let index = 0; index < fields.length; index++) {
    type = getType(getter[fields[index]]);
    if (type.name === 'shape') {
      getter = type.get();
    } else {
      getter = getter[fields[index]];
    }
  }
  return type.convert(value);
};

const formatFindQueryObject = (query, model, options = {}) => {
  const converted = {};

  for (const field in query) {
    const value = query[field];
    if (field in model.fields) {
      const type = getType(model.fields[field]);
      converted[field] = formatFindQueryValue(value, type, options);
    } else if (/\./.test(field)) {
      converted[field] = destructureShape(field, value, model);
    }
  }

  return converted;
};

export default formatFindQueryObject;
