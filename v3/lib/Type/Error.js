// @flow

import _ from 'lodash';
import {Set} from './set';

export default class _Error extends Set {
  static validate(value: any): boolean {
    if (value instanceof Error) {
      return true;
    }
    if (value instanceof this) {
      return true;
    }
    if (
      value &&
      _.isObject(value) &&
      !_.isArray(value) &&
      _.isString(value.message) &&
      _.isString(value.name)
    ) {
      return true;
    }
    return false;
  }
  static convert (value: any): any {
    if (this.validate(value)) {
      return new this(value);
    }
    return value;
  }
  name: string;
  message: string;
  stack: string;
  constructor(error: $error) {
    super();
    Object.assign(this, {
      ...error,
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
  }
}
