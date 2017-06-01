// @flow
import DataType from '../defs/DataType';

const string = new DataType({

  convert(value: any): string | any {
    if (value === null || typeof value === 'undefined') {
      return '';
    }
    if (typeof value.toString === 'function') {
      return value.toString();
    }
    return value;
  },

  validate: (value: any): boolean => (typeof value === 'string'),

});

export default string;
