// @flow

import _ from 'lodash';
import ModelStatement from './Model/extend/Statement';
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
  get(field: string): any {
    return _.get(this.toJSON(), field);
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
    this.ensureRequired();
    this.runValidators();
    return this;
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
    const required = this.constructor._getRequired();
    const doc = this.toJSON();
    for (const field in required) {
      const currentValue = _.get(doc, field);
      if (typeof currentValue === 'undefined' || currentValue === null) {
        throw new MaevaError(MaevaError.MISSING_REQUIRED_FIELD, {
          model: this.constructor._getInfo(),
          field: {[field]: required[field]},
          document: this.toJSON(),
        });
      }
    }
    return this;
  }
  runValidators() {
    const validators = this.constructor._getValidators();
    for (const field in validators) {
      const isValid = validators[field].validator(this.get(field));
      if (!isValid) {
        throw new MaevaError(MaevaError.FIELD_VALIDATOR_FAILED, {
          model: this.constructor._getInfo(),
          field: validators[field],
          document: this.toJSON(),
        });
      }
    }
    return this;
  }
  save() {
    return new Promise(async (resolve, reject) => {
      try {
        this.make();
        if (this.$fromDB) {
          let get = {};
          // is database using unique id or primary keys?
          if (this.$conn.id) {
            const id = this.$conn.id.name;
            get = {[id]: this[id]};
          } else {
            // otherwise use untouched object
            get = this.$old;
          }
          await this.$conn.operations.update({
            model: this,
            collection: this.constructor._getCollectionName(),
            get,
            set: this.$changed,
          });
        } else {
          await this.$conn.operations.insert({
            model: this,
            collection: this.constructor._getCollectionName(),
            documents: this.toJSON(),
          });
        }
        resolve();
        this.$changed = {};
      } catch (error) {
        reject(error);
      }
    });
  }
}
