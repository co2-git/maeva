/**
 *  ****************************************************************************
 *  @module maeva
 *  @name MaevaModelSchema
 *  @description description
 *  @author francois
 *  @license MIT
 *  @type function
 *  @flow
 *  ****************************************************************************
**/

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
      throw new MaevaError(
        error,
        this,
        this._getSchema,
      );
    }
  }
  static _printSchema(): $Schema$JSON {
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
