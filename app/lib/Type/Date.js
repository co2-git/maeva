// @flow
export default class _Date {
  static validate(value: any): boolean {
    return value instanceof Date;
  }
  static convert (value: any): Date|any {
    try {
      return new Date(value);
    } catch (error) {
      return value;
    }
  }
}
