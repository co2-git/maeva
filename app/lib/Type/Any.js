// @flow

import {Set} from './set';

export default class Any extends Set {
  static validate(): boolean {
    return true;
  }
  static convert(value: any): any {
    return value;
  }
}
