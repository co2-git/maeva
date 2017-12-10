import includes from 'lodash/includes';

const convertObject = obj => {
  const converted = {};
  for (const key in obj) {
    converted[key] = convert(obj[key]);
  }
  return converted;
};

const convert = value => {
  if (value === null) {
    return value;
  }
  if (includes(['number', 'boolean', 'undefined', 'string'], typeof value)) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(convert);
  }
  if (typeof value === 'object') {
    if (typeof value.toString === 'function') {
      return value.toString();
    }
    return convertObject(value);
  }
};

const any = () => ({
  name: 'any',
  convert,
  validate: () => {
    // ...
  },
});
export default any;
