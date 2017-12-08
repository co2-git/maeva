const formatInsertQueryValue = (value, type, options = {}) => {
  return type.convert(value, options);
};

export default formatInsertQueryValue;
