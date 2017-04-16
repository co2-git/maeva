// @flow
import Type from './Type';

export default class MaevaTypeString extends Type {

  name = 'String';

  validate(value: any): boolean {
    return (typeof value === 'string');
  }

  convert(value: any): string | any {
    if (value === null || typeof value === 'undefined') {
      return '';
    }
    if (typeof value.toString === 'function') {
      return value.toString();
    }
    return value;
  }

}
