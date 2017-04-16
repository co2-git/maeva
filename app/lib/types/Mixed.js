// @flow
import Type from './Type';
import Field from '../Field';
import type from '../helpers/type';

export default class MaevaTypeMixed extends Type {

  name = 'Mixed';

  types: MaevaField[] = [];

  constructor(...types: Array<Function | MaevaField>) {
    super();
    for (const t_ of types) {
      if (t_ instanceof Field) {
        this.types.push(t_);
      } else {
        this.types.push(type(t_));
      }
    }
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
