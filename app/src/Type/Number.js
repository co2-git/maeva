// @flow
import isNumber from 'lodash/isNumber';

export default class MaevaTypeNumber {

  validate(value: any): boolean {
    return isNumber(value) && isFinite(value);
  }

  convert(value: any): number | any {
    return Number(value);
  }

}
