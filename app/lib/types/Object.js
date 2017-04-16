// @flow
import isObject from 'lodash/isObject';
import Type from './Type';
import Field from '../Field';
import type from '../helpers/type';

type Shape = {
  [field: string]: MaevaField,
};

export default class MaevaTypeObject extends Type {

  name = 'Object';

  shape: Shape = {};

  constructor(shape: Shape = {}) {
    super();
    for (const field in shape) {
      if (shape[field] instanceof Field) {
        this.shape[field] = shape[field];
      } else {
        this.shape[field] = type(shape[field]);
      }
    }
  }

  convert(object: any): Object | any {
    if (!isObject(object)) {
      return object;
    }
    const converted = {};
    for (const field in this.shape) {
      converted[field] = this.shape[field].type.convert(object[field]);
    }
    return converted;
  }

  validate(object: any): boolean {
    if (!isObject(object)) {
      return false;
    }
    let isValid = true;
    for (const field in this.shape) {
      if (!this.shape[field].type.validate(object[field])) {
        isValid = false;
      }
    }
    return isValid;
  }

}
