// @flow

import _ from 'lodash';
import ModelSchema from './Schema';

export default class ModelInfo extends ModelSchema {
  static isMaevaModel = true;
  static version = 0;
  static getCollectionName() {
    if (this._collectionName) {
      return this._collectionName;
    }
    return `${this.name.toLowerCase()}s`;
  }
  static getInfo(options = {}) {
    let schema = false;
    if (!options.skipSchema) {
      schema = this.printSchema(this.getSchema());
    }
    return {
      ..._.pick(this, ['name']),
      collectionName: this.getCollectionName(),
      version: this.version,
      schema,
    };
  }
}
