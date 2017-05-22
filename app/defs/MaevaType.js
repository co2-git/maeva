// @flow
import convert from '../convert';
import validate from '../validate';

export default class MaevaType {

  convert: (value: any) => any;
  validate: (value: any) => boolean;

  constructor(args: Object = {}) {
    Object.assign(this, args);

    if (!this.convert) {
      this.convert = convert;
    }

    if (!this.validate) {
      this.validate = validate;
    }
  }

}
