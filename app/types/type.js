// @flow
import DataType from '../defs/DataType';

const type = (
  {convert, validate}: {convert: convertDataType, validate: validateDataType}
) => new DataType({convert, validate});

export default type;
