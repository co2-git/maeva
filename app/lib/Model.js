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
  static insert(...documents) {
    return this.create(...documents);
  }
  static add(...documents) {
    return this.create(...documents);
  }
  static push(...documents) {
    return this.create(...documents);
  }
}
