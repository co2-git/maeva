// @flow

export default class MaevaTypeDate {

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
