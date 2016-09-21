// @flow
import _ from 'lodash';
import Schema from './Schema';
import Connection from './Connection';
import MaevaError from './Error';
import create from './Model/static/create';
import type {ARGS as CREATE_ARGS} from './Model/static/create';
import remove from './Model/static/remove';
import type {
  ARGS as REMOVE_ARGS,
  RETURN as REMOVE_RETURN,
} from './Model/static/remove';
import makeStatement from './Model/static/makeStatement';
import type {
  ARGS as MAKESTATEMENT_ARGS,
  RETURN as MAKESTATEMENT_RETURN,
} from './Model/static/makeStatement';
import save from './Model/save';
import type {ARGS as SAVE_ARGS} from './Model/save';
import ensureRequired from './Model/ensureRequired';
import set from './Model/set';
import type {MODEL_CONSTRUCTOR_OPTIONS} from './flow';

export default class Model {
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
  static printSchema(_schema: Object): Object {
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
  static makeStatement(...args: MAKESTATEMENT_ARGS): MAKESTATEMENT_RETURN {
    return makeStatement.apply(this, args);
  }
  static find(query: Object = {}, options: Object = {}) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const {model, statement} = await this.makeStatement(query);
        const found = await model.$conn.operations.find({
          model: this,
          collection: this.getCollectionName(),
          query: statement,
          options,
        });
        if (!Array.isArray(found)) {
          return resolve([]);
        }
        const documents = found.map(doc => new this(doc, {
          fromDB: true,
          conn: model.$conn,
        }));
        resolve(documents);
      } catch (error) {
        console.log(error.stack);
        reject(error);
      }
    });
    return promise;
  }
  static findOne(query: Object = {}, options: Object = {}) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const found = this.find(query, {
          ...options,
          limit: 1,
        });
        resolve(found[0]);
      } catch (error) {
        console.log(error.stack);
        reject(error);
      }
    });
    return promise;
  }
  static findById(id: any, options: Object = {}) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const {model} = await this.makeStatement({});
        if (!model.$conn.id) {
          throw new MaevaError('Id not supported by vendor');
        }
        const idName = model.$conn.id.name;
        const statementId = model.set(idName, id)[idName];
        const found = await model.$conn.operations.findById({
          model: this,
          collection: this.getCollectionName(),
          id: statementId,
          options,
        });
        if (!found) {
          return resolve();
        }
        const doc = new this(found, {
          fromDB: true,
          conn: model.$conn,
        });
        resolve(doc);
      } catch (error) {
        console.log(error.stack);
        reject(error);
      }
    });
    return promise;
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
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await this.findById(id, options);
        doc.set(modifier);
        await doc.save();
        doc.$conn.emit('updated', this, doc);
        Connection.events.emit('updated', this, doc);
        resolve(doc);
      } catch (error) {
        console.log(error.stack);
        reject(error);
      }
    });
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
    if (options.fromDB && options.conn) {
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
          const converted = set(key, field[key], this.$schema);
          Object.assign(this, {[key]: converted});
          this.$changed[key] = converted;
        }
        return this;
      }
      const converted = set(field, value, this.$schema);
      Object.assign(this, {[field]: converted});
      this.$changed[field] = converted;
    } catch (error) {
      if (field === 'owner') {
        console.log('OWNER', error.stack);
      }
      Connection.events.emit('warning', error);
    } finally {
      return this;
    }
  }
  async connect() {
    if (!this.$conn) {
      const availableConnections = Connection.connections.filter(
        conn => conn.status === 'connected'
      );
      if (availableConnections.length) {
        this.$conn = availableConnections[0];
      } else {
        await new Promise((resolveConnected) => {
          Connection.events.on('connected', (conn) => {
            this.$conn = conn;
            resolveConnected();
          });
        });
      }
    }
    await this.$conn.ready();
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
    // ...
  }
}
