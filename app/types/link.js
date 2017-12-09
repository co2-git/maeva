import getType from './getType';

const linkType = () => ({
  name: 'link',
  convert: (value, options = {}) => {
    if (
      !options.connection ||
      !options.connection.connector ||
      !options.connection.connector.id ||
      !options.connection.connector.id.type
    ) {
      return value;
    }
    const type = getType(options.connection.connector.id.type);
    if (
      value &&
      typeof value === 'object' &&
      options.connection.connector.id.name in value
    ) {
      return type.convert(value[options.connection.connector.id.name], options);
    }
    return type.convert(value, options);
  },
  validate: (value, options = {}) => {
    if (
      !options.connection ||
      !options.connection.connector ||
      !options.connection.connector.id ||
      !options.connection.connector.id.type
    ) {
      throw new Error('Missing connector info to retrieve id from');
    }
    const idType = getType(options.connection.connector.id.type);
    idType.validate(value, options);
  },
});

export default linkType;
