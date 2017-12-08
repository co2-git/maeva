import first from 'lodash/first';
import keys from 'lodash/keys';

const formatUpdateQueryValue = (value, type, options = {}) => {
  if (typeof value === 'function') {
    const operators = value();
    const operator = first(keys(operators));
    const operatorValue = operators[operator];
    switch (operator) {
    case 'in':
    case 'out': {
      const values = operatorValue.map(_value => type.convert(_value, options));
      return {[operator]: values};
    }
    case 'not':
    case 'above':
    case 'below':
    case 'hasLength':
    case 'hasNotLength':
    case 'hasLengthAbove':
    case 'hasLengthBelow':
    case 'before':
    case 'after':
      return {[operator]: type.convert(operatorValue, options)};
    case 'matches':
    case 'matchesNot':
    case 'includes':
    case 'excludes':
      break;
    default:
      throw new Error(`Unknown operator: ${operator}`);
    }
  } else {
    return type.convert(value, options);
  }
};

export default formatUpdateQueryValue;
