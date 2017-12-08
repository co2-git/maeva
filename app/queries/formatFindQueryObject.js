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
  const converted = [];
  for (const field in query) {
    const value = query[field];
    let convertedValue;
    if (field in model.fields) {
      const type = getType(model.fields[field]);
      const formattedValue = formatFindQueryValue(value, type, options);
      convertedValue = {
        field, operator: 'is',
        value: formattedValue,
      };
    } else if (/\./.test(field)) {
      const formattedValue = destructureShape(field, value, model);
      convertedValue = {
        field,
        operator: 'is',
        value: formattedValue,
      };
    }
    if (convertedValue) {
      if (
        typeof convertedValue.value === 'object' &&
        !(convertedValue.value instanceof Date)
      ) {
        if ('above' in convertedValue.value) {
          convertedValue.operator = 'above';
          convertedValue.value = convertedValue.value.above;
        } else if ('before' in convertedValue.value) {
          convertedValue.operator = 'before';
          convertedValue.value = convertedValue.value.before;
        } else if ('in' in convertedValue.value) {
          convertedValue.operator = 'in';
          convertedValue.value = convertedValue.value.in;
        }
      }
      converted.push(convertedValue);
    }
  }
  return converted;
};

export default formatFindQueryObject;
