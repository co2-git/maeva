const string = {
  name: 'string',
  convert(value) {
    if (value && typeof value.toString === 'function') {
      return value.toString();
    }
    return value;
  },
  validate: (value) => {
    if (typeof value !== 'string') {
      throw new TypeError('String type is expecting a string');
    }
  },
};

export default string;
