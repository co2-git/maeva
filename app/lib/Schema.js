import _ from 'lodash';
import Field from './Field';
import MaevaError from './Error';

export default class Schema {
  constructor(schema) {
    for (const field in schema) {
      try {
        const structure = _.isFunction(schema[field]) ?
          {type: schema[field]} : schema[field]
        Object.assign(this, {[field]: new Field(structure)});
      } catch (error) {
        throw MaevaError.rethrow(
          error,
          'Could not build schema field',
          {field},
        );
      }
    }
  }
}
