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
  static printSchema() {
    return this.getSchema().toJSON();
  }
  static getPopulatableFields() {
    const populatable = [];
    const schema = this.getSchema();
    for (const field in schema) {
      if (schema.get(field).type.isMaevaModel) {
        populatable.push({...schema.get(field), field});
      }
    }
    return populatable;
  }
}
