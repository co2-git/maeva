// @flow

import {Set} from '../../Type/set';

export default class Type extends Set {
  static validate(): boolean {
    return true;
  }
  static convert(value: any): any {
    return value;
  }
}
