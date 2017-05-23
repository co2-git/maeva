// @flow
import isFunction from 'lodash/isFunction';

import defaultConvert from '../types/convert';
import defaultValidate from '../types/validate';

export default class DataType {

  convert: DataConvert;
  validate: DataValidate;

  constructor({convert, validate}: {
    convert?: DataConvert,
    validate?: DataValidate,
  } = {}) {
    this.convert = isFunction(convert) ? convert : defaultConvert;
    this.validate = isFunction(validate) ? validate : defaultValidate;
  }

}
