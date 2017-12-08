const validate = date => {
  if (!(date instanceof Date && date.toString() !== 'Invalid Date')) {
    throw new Error('Expected valid date');
  }
};

const date = {
  name: 'date',
  convert(value) {
    try {
      const _date = new Date(value);
      validate(_date);
      return _date;
    } catch (error) {
      return value;
    }
  },
  validate,
};

export default date;
