import getType from './getType';

const type = (extended, convert, validate, print) => {
  const _type = {};

  const extendedType = getType(extended);

  _type.convert = convert || extendedType.convert;
  _type.name = extendedType.name;
  _type.print = print || extendedType.convert;
  _type.validate = validate || extendedType.validate;

  return getType(_type);
};

export default type;
