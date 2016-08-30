// flow

export default class MungoNumber {
  static validate(value: any): boolean {
    return Boolean(value && value.constructor === Number && isFinite(value));
  }
  static convert(value: any): number {
    return Number(value);
  }
}
