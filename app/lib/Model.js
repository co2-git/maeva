// @flow

import _ from 'lodash';
import ModelStatement from './Model/extend/Statement';
import save from './Model/save';
import ensureRequired from './Model/ensureRequired';
import applyIds from './Model/applyIds';
import runValidators from './Model/runValidators';
import Schema from './Schema';
import Connection from './Connection';
import MaevaError from './Error';

import type {MODEL_CONSTRUCTOR_OPTIONS} from './flow';

export default class Model extends ModelStatement {
  $schema: Schema;
  $conn: Connection;
  $fromDB: boolean;
  $original: Model|Object;
  $changed: Object;
  $old: Model|Object;

  constructor(
    document: ?Object = {},
    options: MODEL_CONSTRUCTOR_OPTIONS|Object = {}
  ) {
    super();
    const modelSchema = this.constructor._getSchema();
    let schema;
    if (options.conn) {
      const vendorSchema = new Schema(options.conn.schema);
      schema = new Schema({...modelSchema, ...vendorSchema});
    } else {
      schema = modelSchema;
    }
    Object.defineProperties(this, {
      $schema: {
        enumerable: false,
        value: schema,
        writable: true,
      },
      $conn: {
        enumerable: false,
        value: options.conn,
        writable: true,
      },
      $fromDB: {
        enumerable: false,
        value: Boolean(options.fromDB),
      },
      $original: {
        enumerable: false,
        value: document,
      },
      $changed: {
        enumerable: false,
        value: {},
        writable: true,
      },
      $old: {
        enumerable: false,
        value: {},
        writable: true,
      },
    });
    for (const field in document) {
      this.set(field, document[field]);
    }
    this.$old = this.toJSON();
  }
  set(fieldName: string|Object, value: any): Model {
    // You can pass `this.set('foo', 1)` or `this.set({foo: 1})`
    // Next block deals with the latter
    if (typeof fieldName === 'object') {
      for (const key in fieldName) {
        this.set(key, fieldName[key]);
      }
      return this;
    }
    let field;
    try {
      field = this.$schema.get(fieldName);
      if (!field) {
        throw new MaevaError(MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA, {
          field,
          schema: this.$schema,
          model: this.constructor._getInfo(),
          document: this.toJSON(),
        });
      }
      const converted = field.set(value);
      _.set(this, fieldName, converted);
      _.set(this.$changed, fieldName, converted);
    } catch (error) {
      Connection.events.emit('warning', {
        model: this.constructor._getInfo(),
        message: error.message.split(/\n/),
        field: field ? {[fieldName]: field} : fieldName,
        ...error,
      });
    } finally {
      return this;
    }
  }
  make() {
    this.applyDefault();
    return this;
  }
  save(options: {}) {
    return save.apply(this, [options]);
  }
  toJSON() {
    return {...this};
  }
  applyDefault() {
    const defaults = this.constructor._getDefault();
    const doc = this.toJSON();
    for (const field in defaults) {
      const currentValue = _.get(doc, field);
      if (typeof currentValue === 'undefined' || currentValue === null) {
        const defaultValue = typeof defaults[field].default === 'function'
          ? defaults[field].default(this) : defaults[field].default;
        this.set(field, defaultValue);
      }
    }
    return this;
  }
  ensureRequired() {
    return ensureRequired.apply(this);
  }
  runValidators() {
    return runValidators.apply(this);
  }
  applyIds() {
    return applyIds.apply(this);
  }
}
