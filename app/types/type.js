// @flow
import DataType from '../defs/DataType';

type Args = {convert: Function, validate: Function};

const type = ({convert, validate}: Args) => new DataType({convert, validate});

export default type;
