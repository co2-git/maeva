// @flow

import {Set} from './set';

export default class _String extends Set {
  static validate(value: any): boolean {
    return (typeof value === 'string');
  }
  static convert(value: any): any {
    if (value === null || typeof value === 'undefined') {
      return '';
    }
    return value.toString();
  }
}
