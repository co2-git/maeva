// @flow
import MaevaType from './defs/MaevaType';

const booleanType = () => new MaevaType({
  convert: (value: any): boolean | any => Boolean(value),
  validate: (value: any): boolean => typeof value === 'boolean',
});

export default booleanType;
