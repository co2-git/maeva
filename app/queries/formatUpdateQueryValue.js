import first from 'lodash/first';
import keys from 'lodash/keys';

const formatUpdateQueryValue = (value, type, options = {}) => {
  if (typeof value === 'function') {
    const operators = value();
    const operator = first(keys(operators));
    const operatorValue = operators[operator];
    switch (operator) {
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
    case 'increment':
      return {[operator]: type.convert(operatorValue, options)};
    default:
      throw new Error(`Unknown operator: ${operator}`);
    }
  } else {
    return type.convert(value, options);
  }
};

export default formatUpdateQueryValue;
