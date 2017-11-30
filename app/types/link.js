import getType from './getType';

const linkType = () => ({
  convert: (value: any, options = {}): any => {
    if (!options.connector) {
      return value;
    }
    if (typeof value === 'object' && (options.connector.id.name in value)) {
      return value[options.connector.id.name];
    }
    return value;
  },
  validate: (value: any, options = {}): boolean => {
    const idType = getType(options.connector.id.type);
    return idType.validate(value);
  },
});

export default linkType;
