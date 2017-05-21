// @flow
import Type from './Type';

export default class MaevaTypeBoolean extends Type {

  name = 'Boolean';

  validate(value: any): boolean {
    return typeof value === 'boolean';
  }

  convert (value: any): boolean | any {
    return Boolean(value);
  }

}
