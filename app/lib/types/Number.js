// @flow
import isNumber from 'lodash/isNumber';
import Type from './Type';

export default class MaevaTypeNumber extends Type {

  name = 'Number';

  validate(value: any): boolean {
    return isNumber(value) && isFinite(value);
  }

  convert(value: any): number | any {
    return Number(value);
  }

}
