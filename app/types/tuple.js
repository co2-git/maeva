// @flow
import Type from './Type';
import getType from '../getType';

export default class MaevaTypeTuple extends Type {

  name = 'Tuple';

  types: Type[] = [];

  constructor(...types: Array<Function | Type>) {
    super();
    this.types = types.map(getType);
  }

  convert(array: any): any[] | any {
    if (!Array.isArray(array)) {
      return array;
    }
    return array.map((value, index) => this.types[index].convert(value));
  }

  validate(array: any): boolean {
    if (!Array.isArray(array)) {
      return false;
    }
    return array.every((item, index) => this.types[index].validate(item));
  }

}
