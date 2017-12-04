import isNumber from 'lodash/isNumber';

const number = {
  convert: (value) => Number(value),
  validate: (value) => {
    if (!(isNumber(value) && isFinite(value))) {
      throw new Error('Expected valid number');
    }
  },
};

export default number;
