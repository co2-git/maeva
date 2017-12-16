const validate = date => {
  if (!(date instanceof Date)) {
    throw new Error('Value is not a date');
  }
  if (date.toString() === 'Invalid Date') {
    throw new Error('Date is invalid');
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
  print: value => value.getTime(),
};

export default date;
