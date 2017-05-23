// @flow
import isObject from 'lodash/isObject';
import Type from './Type';
import getType from '../getType';

type Shape = {
  [field: string]: Type,
};

export default class MaevaTypeObject extends Type {

  name = 'Object';

  shape: Shape = {};

  constructor(shape: Shape = {}) {
    super();
    for (const field in shape) {
      this.shape[field] = getType(shape[field]);
    }
  }

  convert(object: any): Object | any {
    if (!isObject(object)) {
      return object;
    }
    const converted = {};
    for (const field in this.shape) {
      converted[field] = this.shape[field].convert(object[field]);
    }
    return converted;
  }

  validate(object: any): boolean {
    if (!isObject(object)) {
      return false;
    }
    let isValid = true;
    for (const field in this.shape) {
      if (!this.shape[field].validate(object[field])) {
        isValid = false;
      }
    }
    return isValid;
  }

}
