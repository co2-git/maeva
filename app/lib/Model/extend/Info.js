// @flow

import _ from 'lodash';
import ModelSchema from './Schema';

export default class ModelInfo extends ModelSchema {
  static isMaevaModel = true;
  static version = 0;
  static _getCollectionName() {
    return this.collectionName || `${this.name.toLowerCase()}s`;
  }
  static _getInfo(options = {}) {
    let schema = false;
    if (!options.skipSchema) {
      schema = this._printSchema();
    }
    return {
      ..._.pick(this, ['name', 'version']),
      collectionName: this._getCollectionName(),
      schema,
    };
  }
}
