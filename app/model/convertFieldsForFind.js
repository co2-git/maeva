import 'babel-polyfill';
import keys from 'lodash/keys';
import first from 'lodash/first';
import convertValue from './convertValue';
import getType from '../types/getType';

export const convertFieldForFind = (value, type, options = {}) =>
new Promise(async (resolve, reject) => {
  try {
    if (typeof value === 'function') {
      const operators = value();
      const operator = first(keys(operators));
      const operatorValue = operators[operator];
      switch (operator) {
      case 'in':
      case 'out': {
        const values = await Promise.all(operatorValue.map(
          (_value) => convertValue(_value, type, options)
        ));
        resolve({[operator]: values});
      } break;
      case 'not':
      case 'above':
      case 'below':
      case 'hasLength':
      case 'hasNotLength':
      case 'hasLengthAbove':
      case 'hasLengthBelow':
        resolve({[operator]: await convertValue(operatorValue, type, options)});
        break;
      case 'before':
      case 'after':
        break;
      case 'matches':
      case 'matchesNot':
      case 'includes':
      case 'excludes':
        break;
      default:
        throw new Error(`Unknown operator: ${operator}`);
      }
    } else {
      resolve(await convertValue(value, type, options));
    }
  } catch (error) {
    reject(error);
  }
});

const convertFieldsForFind = async (doc, model, options = {}) => {
  const converted = {};

  for (const field in doc) {
    const value = doc[field];
    if (field in model.fields) {
      const type = getType(model.fields[field]);
      converted[field] = await convertFieldForFind(value, type, options);
    } else if (/\./.test(field)) {
      const fields = field.split(/\./);
      const realField = first(fields);
      const type = getType(model.fields[realField]);
      converted[field] = await convertFieldForFind(value, type, options);
    }
  }

  return {
    ...doc,
    ...converted
  };
};

export default convertFieldsForFind;
