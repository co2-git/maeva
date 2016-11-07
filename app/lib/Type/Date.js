// @flow

import {Set} from './set';

export default class _Date extends Set {
  static validate(value: any): boolean {
    return value instanceof Date && value.toString() !== 'Invalid Date';
  }
  static convert (value: any): Date | any {
    try {
      const date = new Date(value);
      return this.validate(date) ? date : value;
    } catch (error) {
      return value;
    }
  }
}
