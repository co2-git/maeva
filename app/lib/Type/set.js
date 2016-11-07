// @flow

import MaevaError from '../Error';
import {Type} from '../Type';

export class Set {
  static validate(): boolean {
    return false;
  }
  static convert(value: any): any {
    return value;
  }
  static set(value: any): any {
    return set(value, this);
  }
}

export function set(value: any, type: Function): any {
  const converted = type.convert(value);
  if (type.validate(converted)) {
    return converted;
  }
  throw new MaevaError(
    'Failed setting value to type',
    {value},
    new Type(type),
    MaevaError.COULD_NOT_SET_VALUE_TO_TYPE,
  );
}
