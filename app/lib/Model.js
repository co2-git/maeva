// @flow
import _ from 'lodash';
import Schema from './Schema';
import Connection from './Connection';
import MaevaError from './Error';

export default class Model {
  static getInfo(options = {}) {
    return {
      ..._.pick(this, ['name']),
      schema: options.skipSchema ? false : this.getSchema(),
      collectionName: this.getCollectionName(),
    };
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
    switch (typeof value) {
    case 'undefined': return value;
    case 'number': return value;
    case 'object': {
      if (value === null) {
        return value;
      }
    }
    default: return value;
    }
  }
  static create(document: ?Object|Object[], options: Object = {}) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        let docs;
        if (Array.isArray(document)) {
          docs = document.map(doc => new this(doc, options));
        } else {
          docs = [new this(document, options)];
        }
        await Promise.all(docs.map(doc => doc.save({
          dontSend: true,
        })));
        const results = await docs[0].$conn.operations.insert({
          model: this,
          collection: this.getCollectionName(),
          documents: docs,
        });
        const documents = results.map(
          result => new this(result, {fromDB: true})
        );
        if (Array.isArray(document)) {
          resolve(documents);
        } else {
          resolve(documents[0]);
        }
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }
  static insert(...args) {
    return this.create(...args);
  }
  static add(...args) {
    return this.create(...args);
  }
  static push(...args) {
    return this.create(...args);
  }
  static find(query: Object = {}, options: Object = {}) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const model = new this();
        await model.connect();
        const found = await model.$conn.operations.find({
          model: this,
          collection: this.getCollectionName(),
          query,
          options,
        });
        if (!Array.isArray(found)) {
          return resolve();
        }
        const documents = found.map(doc => new this(doc));
        resolve(documents);
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
  constructor(document = {}, options = {}) {
    Object.defineProperties(this, {
      $schema: {
        enumerable: false,
        value: this.constructor.getSchema(),
      },
      $warnings: {
        enumerable: false,
        value: [],
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
    });
    for (const field in document) {
      this.set(field, document[field]);
    }
  }
  set(field, value): Model {
    if (typeof field === 'object') {
      for (const key in field) {
        this.set(key, field[key]);
      }
      return this;
    }
    const schema = this.$schema[field];
    if (!schema) {
      this.$warnings.push(`Unknown field: ${field}`);
      return this;
    }
    const converted = schema.convert(value);
    if (!schema.validate(converted)) {
      this.$warnings.push(`Unvalid value for field ${field}`);
      return this;
    }

    this[field] = converted;

    return this;
  }
  async connect() {
    if (!this.$conn) {
      const availableConnections = Connection.connections.filter(
        conn => conn.status === 'connected'
      );
      if (availableConnections.length) {
        this.$conn = availableConnections[0];
      } else {
        await new Promise((resolveConnected, rejectConnected) => {
          Connection.events.on('connected', (conn) => {
            this.$conn = conn;
            resolveConnected();
          });
        });
      }
    }
    await this.$conn.ready();
  }
  save(options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connect();
        this.applyDefault();
        this.ensureRequired();
        this.runValidators();
        if (options.dontSend) {
          resolve();
          return;
        }
        const results = await $this.conn.operations.insert({
          model: this,
          collection: this.getCollectionName(),
          documents: candidate,
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
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
    for (const field in this.$schema) {
      if (!(field in this) && this.$schema[field].required) {
        throw new MaevaError('Missing required field', {
          model: this.constructor.getInfo(),
          field,
          code: MaevaError.MISSING_REQUIRED_FIELD,
        });
      }
    }
  }
  runValidators() {

  }
}
