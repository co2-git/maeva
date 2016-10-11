// @flow

import _ from 'lodash';
import {Set} from './set';
import _Number from './Number';

type REGEXP = RegExp | {
  global: boolean,
  ignoreCase: boolean,
  multiline: boolean,
  source: string,
};

export default class _RegExp extends Set {
  static validate(value: any): boolean {
    if (value instanceof RegExp) {
      return true;
    }
    if (value instanceof this) {
      return true;
    }
    if (
      value &&
      _.isObject(value) &&
      !_.isArray(value) &&
      _.isString(value.source) &&
      _.isBoolean(value.global) &&
      _.isBoolean(value.ignoreCase) &&
      _.isBoolean(value.multiline)
    ) {
      return true;
    }
    return false;
  }
  static convert (value: any): any {
    if (value instanceof this) {
      return value;
    }
    if (this.validate(value)) {
      return new this(value);
    }
    if ((_.isString(value) && value) || _Number.validate(value)) {
      return new this(new RegExp(value.toString()));
    }
    return value;
  }
  global: boolean;
  ignoreCase: boolean;
  multiline: boolean;
  source: string;
  constructor(regex: REGEXP) {
    super();
    if ((_.isString(regex) && regex) || _Number.validate(regex)) {
      regex = new RegExp(regex.toString());
    }
    Object.assign(this, {
      source: regex.source,
      global: regex.global,
      ignoreCase: regex.ignoreCase,
      multiline: regex.multiline,
    });
  }
}
