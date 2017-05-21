// @flow
import Type from './Type';
import getType from '../getType';

export default class MaevaTypeArray extends Type {

  name = 'Array';

  type: Type;

  constructor(type: Function | Type) {
    super();
    this.type = getType(type);
  }

  convert(array: any): any[] | any {
    if (!Array.isArray(array)) {
      return array;
    }
    return array.map((value) => this.type.convert(value));
  }

  validate(array: any): boolean {
    if (!Array.isArray(array)) {
      return false;
    }
    return array.every((item) => this.type.validate(item));
  }

}
