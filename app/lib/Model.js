// @flow
// 3rd party libraries
import _ from 'lodash';
// Libraries
import Schema from './Schema';
import Connection from './Connection';
import MaevaError from './Error';
// Utils
import printSchema from './utils/printSchema';
import type {
  ARGS as PRINTSCHEMA_ARGS,
  RETURN as PRINTSCHEMA_RETURN,
} from './utils/printSchema';
import set from './utils/set';
// Model static methods
import create from './Model/static/create';
import type {ARGS as CREATE_ARGS} from './Model/static/create';
import remove from './Model/static/remove';
import type {
  ARGS as REMOVE_ARGS,
  RETURN as REMOVE_RETURN,
} from './Model/static/remove';
import makeStatement from './utils/makeStatement';
import type {
  ARGS as MAKESTATEMENT_ARGS,
  RETURN as MAKESTATEMENT_RETURN,
} from './utils/makeStatement';
import find from './Model/static/find';
import type {
  ARGS as FIND_ARGS,
  RETURN as FIND_RETURN,
} from './Model/static/find';
import getPopulatableFields from './Model/static/getPopulatableFields';
import findOne from './Model/static/findOne';
import findById from './Model/static/findById';
import updateById from './Model/static/updateById';
// Model methods
import save from './Model/save';
import type {ARGS as SAVE_ARGS} from './Model/save';
import ensureRequired from './Model/ensureRequired';
import applyIds from './Model/applyIds';
import runValidators from './Model/runValidators';

import type {MODEL_CONSTRUCTOR_OPTIONS} from './flow';

export default class Model {
  static isMaevaModel = true;
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
  static version = 0;
  static schema = {};
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
  static printSchema(...args: PRINTSCHEMA_ARGS): PRINTSCHEMA_RETURN {
    return printSchema.apply(null, args);
  }
  static getPopulatableFields(...args: SAVE_ARGS) {
    return getPopulatableFields.apply(this, args);
  }
  static getCollectionName() {
    if (this._collectionName) {
      return this._collectionName;
    }
    return `${this.name.toLowerCase()}s`;
  }
  static validate(model: any): boolean {
    if (model instanceof Model) {
      return true;
    }
    return false;
  }
  static convert(value: any): Model|any {
    return value;
  }
  static create(...args: CREATE_ARGS) {
    return create.apply(this, args);
  }
  static insert(...args: CREATE_ARGS) {
    return this.create(...args);
  }
  static add(...args: CREATE_ARGS) {
    return this.create(...args);
  }
  static push(...args: CREATE_ARGS) {
    return this.create(...args);
  }
  static async makeStatement(query: Object = {}, schema: Schema|Object = {}):
  MAKESTATEMENT_RETURN {
    const conn = await Connection.findConnection();
    const model = new this({}, {conn});
    const statement = await makeStatement(query, model.$schema);
    return {model, statement, conn};
  }
  static find(...args: FIND_ARGS): FIND_RETURN {
    return find.apply(this, args);
  }
  static findOne(...args) {
    return findOne.apply(this, args);
  }
  static findById(id: any, options: Object = {}) {
    return findById.apply(this, [id, options]);
  }
  static get(...args) {
    return this.find(...args);
  }
  static fetch(...args) {
    return this.find(...args);
  }
  static select(...args) {
    return this.find(...args);
  }
  static getById(...args) {
    return this.findById(...args);
  }
  static fetchById(...args) {
    return this.findById(...args);
  }
  static selectById(...args) {
    return this.findById(...args);
  }
  static update(query, modifier, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const docs = await this.find(query, options);
        docs.forEach(doc => doc.set(modifier));
        await Promise.all(docs.map(doc => doc.save()));
        docs[0].$conn.emit('updated', this, docs);
        Connection.events.emit('updated', this, docs);
        resolve(docs);
      } catch (error) {
        console.log(error.stack);
        reject(error);
      }
    });
  }
  static updateById(id, modifier, options) {
    return updateById.apply(this, [id, modifier, options]);
  }
  static remove(...args: REMOVE_ARGS): REMOVE_RETURN {
    return remove.apply(this, args);
  }
  static delete(...args) {
    return this.remove(...args);
  }
  static pull(...args) {
    return this.remove(...args);
  }
  constructor(
    document: ?Object = {},
    options: MODEL_CONSTRUCTOR_OPTIONS|Object = {}
  ) {
    const modelSchema = this.constructor.getSchema();
    let schema;
    if (options.conn) {
      const vendorSchema = new Schema(options.conn.schema);
      schema = {...modelSchema, ...vendorSchema};
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
  set(field: string|Object, value: any): Model {
    try {
      // You can pass `this.set('foo', 1)` or `this.set({foo: 1})`
      // Next block deals with the latter
      if (typeof field === 'object') {
        for (const key in field) {
          this.set(key, field[key]);
        }
        return this;
      }
      const converted = set(field, value, this.$schema);
      Object.assign(this, {[field]: converted});
      this.$changed[field] = converted;
    } catch (error) {
      Connection.events.emit('warning', {
        message: error.message.split(/\n/),
        ...error,
      });
    } finally {
      return this;
    }
  }
  save(...args: SAVE_ARGS) {
    return save.apply(this, args);
  }
  toJSON() {
    return {...this};
  }
  applyDefault() {
    for (const field in this.$schema) {
      if (!(field in this) && ('default' in this.$schema[field])) {
        if (typeof this.$schema[field].default === 'function') {
          this[field] = this.$schema[field].default(this);
        } else {
          this[field] = this.$schema[field].default;
        }
      }
    }
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
