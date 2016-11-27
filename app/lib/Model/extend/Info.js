// @flow

import _ from 'lodash';
import ModelSchema from './Schema';

type $_getInfo$options = {
  skipSchema?: boolean,
};

export default class ModelInfo extends ModelSchema {
  static isMaevaModel = true;
  static version = 0;
  static _getCollectionName(): string {
    if (typeof this.collectionName === 'string') {
      return this.collectionName;
    }
    return `${this.name.toLowerCase()}s`;
  }
  static toJSON(options: $_getInfo$options = {}): $Model$info {
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
  static _getInfo(options: $_getInfo$options = {}): $Model$info {
    return this.toJSON(options);
  }
}
