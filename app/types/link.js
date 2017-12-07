import getType from './getType';

const linkType = () => ({
  name: 'link',
  convert: (value, options = {}) => {
    if (
      !options.connection ||
      !options.connection.connector ||
      !options.connection.connector.id ||
      typeof options.connection.connector.id.type !== 'function'
    ) {
      return value;
    }
    const type = getType(options.connection.connector.id.type);
    if (
      value &&
      typeof value === 'object' &&
      options.connection.connector.id.name in value
    ) {
      return type.convert(value[options.connection.connector.id.name]);
    }
    return type.convert(value);
  },
  validate: (value, options = {}) => {
    if (
      !options.connection ||
      !options.connection.connector ||
      !options.connection.connector.id ||
      typeof options.connection.connector.id.type !== 'function'
    ) {
      throw new Error('Missing connector info to retrieve id from');
    }
    const idType = getType(options.connection.connector.id.type);
    idType.validate(value);
  },
});

export default linkType;
