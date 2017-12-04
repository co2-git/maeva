import first from 'lodash/first';
import arrayType from './array';
import booleanType from './boolean';
import dateType from './date';
import numberType from './number';
import stringType from './string';

export default function getType(type) {
  switch (type) {
  case null:
    throw new Error('Type can not be null');
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
    if (typeof type === 'undefined') {
      throw new Error('Type can not be undefined');
    }
    if (typeof type.convert !== 'function') {
      throw new Error('Type must have a convert function');
    }
    if (typeof type.validate !== 'function') {
      throw new Error('Type must have a validate function');
    }
    return type;
  }
}
