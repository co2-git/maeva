// @flow

import ModelType from './Type';
import Field from '../../Field';
import Schema from '../../Schema';
import Model from '../../Model';
import MaevaError from '../../Error';

export default class ModelSchema extends ModelType {
  static schema = {};
  static _getSchema(): Schema {
    try {
      return new Schema(this.schema);
    } catch (error) {
      throw MaevaError.rethrow(
        error,
        'Could not build schema',
        {
          model: this._getInfo({skipSchema: true}),
          code: MaevaError.FAILED_BUILDING_SCHEMA,
        },
      );
    }
  }
  static _printSchema(): Object {
    return this._getSchema().toJSON();
  }
  static _getLinks(): {[dotNotation: string]: Model} {
    return this._getSchema().getLinks();
  }
  static _getRequired(): {[dotNotation: string]: Field} {
    return this._getSchema().getRequired();
  }
  static _getDefault(): {[dotNotation: string]: Field} {
    return this._getSchema().getDefault();
  }
  static _getValidators(): {[dotNotation: string]: Field} {
    return this._getSchema().getValidators();
  }
  static _getEmbedded(): {[dotNotation: string]: Field} {
    return this._getSchema().getEmbedded();
  }
}
