// @flow
import _ from 'lodash';

export default class MungoObject {
  constructor(object: Object = {}) {
    Object.assign(this, object);
  }

  static validate(value: any): boolean {
    return _.isObject(value) && !_.isArray(value);
  }

  static convert(value: any): any {
    return value;
  }
}
