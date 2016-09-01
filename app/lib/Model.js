// @flow
import Schema from './Schema';
import Connection from './Connection';

export default class Model {
  static getSchema(): Schema {
    return new Schema(this.schema);
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
        console.log(error.stack);
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
  static find(document: ?Object|Object[], options: Object = {}) {
    console.log('Model.create', document);
    const promise = new Promise(async (resolve, reject) => {
      try {
        let docs;
        if (Array.isArray(document)) {
          docs = document;
        } else {
          docs = [document];
        }
        const schema = this.getSchema();
        // apply default
        // convert values
        // check required
        // run validators
        let candidate = Array.isArray(document) ? docs : docs[0];
        console.log({options});
        if (!options.conn) {
          if (Connection.connections.length) {
            options.conn = Connection.connections[0];
          } else {
            await new Promise((resolveConnected, rejectConnected) => {
              Connection.events.on('connected', (conn) => {
                options.conn = conn;
                resolveConnected();
              });
            });
          }
        }
        console.log({conn: options.conn});
        await options.conn.ready();
        console.log('ready');
        const results = await options.conn.operations.insert({
          model: this,
          collection: this.getCollectionName(),
          documents: candidate,
        });
        console.log({results});
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

    this[field] = value;

    return this;
  }
  async connect() {
    if (!this.$conn) {
      if (Connection.connections.length) {
        this.$conn = Connection.connections[0];
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
}
