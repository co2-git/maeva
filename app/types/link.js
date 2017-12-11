const linkType = () => {
  // const link = typeof _link === 'function' ? _link() : _link;
  return {
    name: 'link',
    convert: (value, options = {}) => {
      if (
        !options.connection ||
        !options.connection.connector ||
        !options.connection.connector.idName
      ) {
        return value;
      }
      let idName;
      if (typeof options.connection.connector.idName === 'function') {
        idName = options.connection.connector.idName();
      } else {
        idName = options.connection.connector.idName;
      }
      if (
        value &&
        typeof value === 'object' &&
        idName in value
      ) {
        return value[idName];
      }
      return value;
    },
    validate: (value, options = {}) => {
      if (
        !options.connection ||
        !options.connection.connector ||
        !options.connection.connector.idName
      ) {
        throw new Error('Missing connector info to retrieve id from');
      }
    },
  };
};

export default linkType;
