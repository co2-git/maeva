import Schema from './Schema';

export default class Model {
  static getSchema() {
    return new Schema(this);
  }
}
