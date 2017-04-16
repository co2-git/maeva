// flow

import _ from 'lodash';
import {Set} from './set';

export default class _Number extends Set {
  static validate(value: any): boolean {
    return _.isNumber(value) && isFinite(value);
  }
  static convert(value: any): number {
    return Number(value);
  }
}
