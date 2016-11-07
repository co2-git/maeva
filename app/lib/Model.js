/**
 *  ****************************************************************************
 *  @module module
 *  @name name
 *  @description description
 *  @author francois
 *  @license MIT
 *  @type function
 *  @flow
 *  ****************************************************************************
**/

import _ from 'lodash';
import ModelStatement from './Model/extend/Statement';
import Schema from './Schema';
import Connection from './Connection';
import MaevaError from './Error';

export default class Model extends ModelStatement {
  // static _getSchema: Function;

  $schema: Schema;
  $conn: ?Connection;
  $fromDB: boolean;
  $original: Model | {[fieldName: string]: any};
  $changed: {};
  $old: Model | {[fieldName: string]: any};

  constructor(
    document: $fields = {},
    options: $Model$options = {}
  ) {
    super();
    // $ExpectError
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
  set(fieldName: string | Object, value: any): Model {
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
        throw new MaevaError(
          MaevaError.COULD_NOT_FIND_FIELD_IN_SCHEMA,
          {field: fieldName},
          this.$schema,
          this.constructor,
          this,
        );
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
  make(): Model {
    this.applyDefault();
    this.ensureRequired();
    this.runValidators();
    return this;
  }
  toJSON(): $fields {
    return {...this};
  }
  applyDefault(): Model {
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
  ensureRequired(): Model {
    const required = this.constructor._getRequired();
    const doc = this.toJSON();
    for (const field in required) {
      const currentValue = _.get(doc, field);
      if (typeof currentValue === 'undefined' || currentValue === null) {
        throw new MaevaError(
          'Missing required field',
          MaevaError.MISSING_REQUIRED_FIELD,
          this.constructor,
          required[field],
          this,
        );
      }
    }
    return this;
  }
  runValidators(): Model {
    const validators = this.constructor._getValidators();
    for (const fieldName in validators) {
      const field = validators[fieldName];
      if (field !== null && typeof field.validator === 'function') {
        const isValid = field.validator(this.get(fieldName));
        if (!isValid) {
          throw new MaevaError(
            'Field custom validator failed',
            MaevaError.FIELD_VALIDATOR_FAILED,
            this,
            field,
          );
        }
      }
    }
    return this;
  }
  save(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        this.make();
        if (this.$fromDB && this.$conn && this.$conn.operations) {
          let get = {};
          // is database using unique id or primary keys?
          if (this.$conn._id) {
            const id = this.$conn._id.name;
            get = {[id]: this.get(id)};
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
        } else if (this.$conn && this.$conn.operations) {
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
