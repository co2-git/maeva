// @flow
import Schema from './Schema';

export default class Model {
  static getSchema(): Schema {
    return new Schema(this.schema);
  }
  static validate(model: any): boolean {
    if (model instanceof Model) {
      return true;
    }
    return false;
  }
}
