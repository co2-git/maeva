// @flow
import Type from '../Type';

export default class MaevaTypeArray {

  type: Function;

  constructor(type: Function) {
    this.type = Type.associate(type);
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
