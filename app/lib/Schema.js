import _ from 'lodash';
import Field from './Field';

export default class Schema {
  fields = {};
  constructor(schema) {
    for (const field in schema) {
      this.fields[field] = new Field(
        _.isFunction(schema[field]) ? {type: schema[field]} : schema[field]
      );
    }
  }
}
