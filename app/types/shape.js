// @flow
import isObject from 'lodash/isObject';
import DataType from '../defs/DataType';
import getType from './getType';

const shape = (_shape: Object) => {
  const __shape = {};
  for (const key in _shape) {
    __shape[key] = getType(shape[key]);
  }
  return new DataType({

    convert(object: any): Object | any {
      if (!isObject(object)) {
        return object;
      }
      const converted = {};
      for (const field in __shape) {
        converted[field] = __shape[field].convert(object[field]);
      }
      return converted;
    },

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

  });
};

export default shape;
