// @flow
import DataType from '../defs/DataType';

const date = new DataType({

  convert(value: any): Date | any {
    try {
      const _date = new Date(value);

      if (this.vali_date(_date)) {
        return date;
      }
      return value;
    } catch (error) {
      return value;
    }
  },

  validate: (value: any): boolean => (
    value instanceof Date && value.toString() !== 'Invalid Date'
  ),

});

export default date;
