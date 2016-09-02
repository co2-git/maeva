// flow
import _ from 'lodash';

export default class MungoNumber {
  static validate(value: any): boolean {
    return _.isNumber(value) && isFinite(value);
  }
  static convert(value: any): number {
    return Number(value);
  }
}
