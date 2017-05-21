// @flow
import Type from './Type';

export default class MaevaTypeDate extends Type {

  name = 'Date';

  flags = ['date'];

  validate(value: any): boolean {
    return value instanceof Date && value.toString() !== 'Invalid Date';
  }

  convert (value: any): Date | any {
    try {
      const date = new Date(value);

      if (this.validate(date)) {
        return date;
      }
      return value;
    } catch (error) {
      return value;
    }
  }

}
