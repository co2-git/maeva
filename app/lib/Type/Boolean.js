// @flow

import {Set} from './set';

export default class _Boolean extends Set {
  static validate(value: any): boolean {
    return typeof value === 'boolean';
  }
  static convert (value: any): boolean {
    return Boolean(value);
  }
}
