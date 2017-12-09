import getType from '../types/getType';
import formatUpdateQueryValue from './formatUpdateQueryValue';

const getShapeType = (field, value, model, options) => {
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
  return type;
};

const formatUpdateQueryObject = (query, model, options = {}) => {
  const converted = [];
  for (const field in query) {
    const value = query[field];
    let convertedValue;
    if (field in model.fields) {
      const type = getType(model.fields[field]);
      const formattedValue = formatUpdateQueryValue(value, type, options);
      convertedValue = {
        field,
        operator: 'set',
        value: formattedValue,
      };
    } else if (/\./.test(field)) {
      const type = getShapeType(field, value, model, options);
      const formattedValue = formatUpdateQueryValue(value, type, options);
      convertedValue = {
        field,
        operator: 'set',
        value: formattedValue,
      };
    }
    if (convertedValue) {
      if (
        typeof convertedValue.value === 'object' &&
        !(convertedValue.value instanceof Date)
      ) {
        if ('add' in convertedValue.value) {
          convertedValue.operator = 'add';
          convertedValue.value = convertedValue.value.add;
        } else if ('subtract' in convertedValue.value) {
          convertedValue.operator = 'subtract';
          convertedValue.value = convertedValue.value.subtract;
        } else if ('multiply' in convertedValue.value) {
          convertedValue.operator = 'multiply';
          convertedValue.value = convertedValue.value.multiply;
        } else if ('divide' in convertedValue.value) {
          convertedValue.operator = 'divide';
          convertedValue.value = convertedValue.value.divide;
        }
      }
      converted.push(convertedValue);
    }
  }
  return converted;
};

export default formatUpdateQueryObject;
