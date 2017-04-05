// @flow

export default class MaevaTypeBoolean {

  validate(value: any): boolean {
    return typeof value === 'boolean';
  }

  convert (value: any): boolean | any {
    return Boolean(value);
  }

}
