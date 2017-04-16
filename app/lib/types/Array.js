// @flow
import Type from './Type';
import associate from './associate';
import Field from '../Field';

export default class MaevaTypeArray extends Type {

  name = 'Array';

  type: Type;

  constructor(t_: Function | Field) {
    super();
    if (t_ instanceof Field) {
      this.type = t_.type;
    } else if (typeof t_ === 'function') {
      this.type = associate(t_);
    }
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
