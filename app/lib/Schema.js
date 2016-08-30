import _ from 'lodash';
import Field from './Field';

export default class Schema {
  constructor(schema) {
    for (const field in schema) {
      const structure = _.isFunction(schema[field]) ?
        {type: schema[field]} : schema[field]
      Object.assign(this, {[field]: new Field(structure)});
    }
  }
}
