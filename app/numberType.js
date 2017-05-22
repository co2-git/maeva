// @flow
import isNumber from 'lodash/isNumber';
import MaevaType from './defs/MaevaType';

const numberType = () => new MaevaType({
  convert: (value: any): number | any => Number(value),
  validate: (value: any): boolean => (
    isNumber(value) && isFinite(value)
  ),
});

export default numberType;
