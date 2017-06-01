// @flow
import isNumber from 'lodash/isNumber';
import DataType from '../defs/DataType';

const number = new DataType({
  convert: (value: any): number | any => Number(value),
  validate: (value: any): boolean => (isNumber(value) && isFinite(value)),
});

export default number;
