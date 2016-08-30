// @flow
export default class _Boolean {
  static validate(value: any): boolean {
    return typeof value === 'boolean';
  }
  static convert (value: any): boolean {
    return Boolean(value);
  }
}
