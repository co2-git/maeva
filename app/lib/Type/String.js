// @flow
export default class MungoString {
  static validate(value: any): boolean {
    return (typeof value === 'string');
  }
  static convert(value: any): any {
    if (value === null || typeof value === 'undefined') {
      return value;
    }
    return value.toString();
  }
}
