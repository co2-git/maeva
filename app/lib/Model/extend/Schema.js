// @flow

import ModelType from './Type';
import Schema from '../../Schema';
import MaevaError from '../../Error';

export default class ModelSchema extends ModelType {
  static schema = {};
  // will be overwritten by ModelInfo.getInfo
  static getInfo(model: Object) {
    return model;
  }
  static getSchema(): Schema {
    try {
      return new Schema(this.schema);
    } catch (error) {
      throw MaevaError.rethrow(
        error,
        'Could not build schema',
        {
          model: this.getInfo({skipSchema: true}),
          code: MaevaError.FAILED_BUILDING_SCHEMA,
        },
      );
    }
  }
  static printSchema(_schema: Object) {
    const schema = {};
    for (const field in _schema) {
      if (_schema[field].type.name === '_EmbeddedMaevaDocument') {
        schema[field] = {
          ..._schema[field],
          type: this.printSchema(_schema[field].type.schema),
        };
      } else {
        schema[field] = {
          ..._schema[field],
          type: _schema[field].type.name,
        };
      }
    }
    return schema;
  }
  static getPopulatableFields() {
    const populatable = [];
    const schema = this.getSchema();
    for (const field in schema) {
      if (schema[field].type.isMaevaModel) {
        populatable.push({...schema[field], field});
      }
    }
    return populatable;
  }
}
