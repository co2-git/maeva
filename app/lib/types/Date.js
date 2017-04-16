// @flow
import Type from './Type';

export default class MaevaTypeDate extends Type {

  name = 'Date';

  validate(value: any): boolean {
    return value instanceof Date && value.toString() !== 'Invalid Date';
  }

  convert (value: any): Date | any {
    try {
      return new Date(value);
    } catch (error) {
      return value;
    }
  }

}
