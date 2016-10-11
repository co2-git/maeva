// @flow

import MaevaError from '../Error';

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
  throw new MaevaError(MaevaError.FAILED_SETTING_VALUE_TO_TYPE, {
    type: type.name,
    value,
  });
}
