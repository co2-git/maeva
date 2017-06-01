// @flow
import DataType from '../defs/DataType';

const boolean = new DataType({
  convert: (value: any): boolean | any => Boolean(value),
  validate: (value: any): boolean => typeof value === 'boolean',
});

export default boolean;
