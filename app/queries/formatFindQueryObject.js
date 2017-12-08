import keys from 'lodash/keys';
import first from 'lodash/first';
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
  let result;
  if (typeof value === 'function') {
    const resolved = value();
    const resolvedKey = first(keys(resolved));
    result = {[resolvedKey]: type.convert(resolved[resolvedKey])};
  } else {
    result = type.convert(value);
  }
  return result;
};

const formatFindQueryObject = (query, model, options = {}) => {
  const converted = [];
  for (const field in query) {
    const value = query[field];
    let convertedValue;
    if (field in model.fields) {
      const type = getType(model.fields[field]);
      if (value instanceof RegExp) {
        convertedValue = {
          field, operator: 'matches',
          value: value.toString(),
        };
      } else {
        const formattedValue = formatFindQueryValue(value, type, options);
        convertedValue = {
          field, operator: 'is',
          value: formattedValue,
        };
      }
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
        } else if ('not' in convertedValue.value) {
          convertedValue.operator = 'not';
          convertedValue.value = convertedValue.value.not;
        } else if ('out' in convertedValue.value) {
          convertedValue.operator = 'out';
          convertedValue.value = convertedValue.value.out;
        } else if ('below' in convertedValue.value) {
          convertedValue.operator = 'below';
          convertedValue.value = convertedValue.value.below;
        } else if ('after' in convertedValue.value) {
          convertedValue.operator = 'after';
          convertedValue.value = convertedValue.value.after;
        } else if ('before' in convertedValue.value) {
          convertedValue.operator = 'before';
          convertedValue.value = convertedValue.value.before;
        }
      }
      converted.push(convertedValue);
    }
  }
  return converted;
};

export default formatFindQueryObject;
