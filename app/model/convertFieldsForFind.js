import 'babel-polyfill';
import keys from 'lodash/keys';
import first from 'lodash/first';
import convertValue from './convertValue';
import getType from '../types/getType';

const convertFieldsForFind = async (doc, model, options = {}) => {
  const converted = {};

  for (const field in doc) {
    if (field in model.fields) {
      const type = getType(model.fields[field]);
      const value = doc[field];
      if (typeof value === 'function') {
        const operators = value();
        const operator = first(keys(operators));
        const operatorValue = operators[operator];
        switch (operator) {
        case 'in':
        case 'out': {
          const values = await Promise.all(operatorValue.map(
            async (_value) => convertValue(_value, type, options)
          ));
          converted[field] = {
            [operator]: values
          };
        } break;
        case 'not':
        case 'above':
        case 'below':
        case 'hasLength':
        case 'hasNotLength':
        case 'hasLengthAbove':
        case 'hasLengthBelow':
          converted[field] = {
            [operator]: await convertValue(operatorValue, type, options)
          };
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
        converted[field] = await convertValue(value, type, options);
      }
    }
  }

  return {
    ...doc,
    ...converted
  };
};

export default convertFieldsForFind;
