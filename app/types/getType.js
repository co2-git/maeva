import first from 'lodash/first';
import arrayType from './array';
import booleanType from './boolean';
import dateType from './date';
import numberType from './number';
import stringType from './string';
import nullType from './null';

const _getType = type => {
  switch (type) {
  case null:
    return nullType;
  case String:
    return stringType;
  case Number:
    return numberType;
  case Boolean:
    return booleanType;
  case Date:
    return dateType;
  default:
    if (Array.isArray(type)) {
      return arrayType(first(type));
    }
    return type;
  }
};

export default function getType(type) {
  const _type = _getType(type);
  if (!_type.name) {
    throw new TypeError('Types must have names');
  }
  if (typeof _type === 'undefined') {
    throw new TypeError(`Type ${_type.name} can not be undefined`);
  }
  if (typeof _type.convert !== 'function') {
    throw new TypeError(`Type ${_type.name} must have a convert function`);
  }
  if (typeof _type.validate !== 'function') {
    throw new TypeError(`Type ${_type.name} must have a validate function`);
  }
  if (typeof _type.print !== 'function') {
    _type.print = _type.convert;
  }
  return _type;
}
