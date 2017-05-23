// @flow
import DataModel from '../defs/DataModel';

const model = (
  name: string,
  fields: Object,
  options: Object,
) => new DataModel(name, fields, options);

export default model;
