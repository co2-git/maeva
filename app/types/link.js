import getType from './getType';

const linkType = () => ({
  acceptObjects: true,
  convert: (value, options = {}) => {
    if (!options.connector) {
      return value;
    }
    return options.connector.id.type.convert(value);
  },
  validate: (value, options = {}) => {
    const idType = getType(options.connector.id.type);
    idType.validate(value);
  },
});

export default linkType;
