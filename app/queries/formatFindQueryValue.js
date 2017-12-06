import first from 'lodash/first';
import keys from 'lodash/keys';

import convertValue from '../types/convertValue';

const formatFindQueryValue = (value, type, options = {}) =>
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

export default formatFindQueryValue;
