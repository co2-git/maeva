const isPrimitive = value =>
  value === null ||
  typeof value === 'string' ||
  typeof value === 'number' ||
  typeof value === 'boolean'
  ;

export default isPrimitive;
