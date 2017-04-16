// @flow
import uuid from 'uuid';
import Connection from '../Connection';
import type from '../helpers/type';

export default class StaticModel {

  static collectionName = '';

  static maevaSchema = type.object({
    id: type(String).default(uuid.v4),
    version: type(Number).default((doc) => doc.getModel().version),
    revision: type(Number).default(0),
    inserted: type(Date).default(Date.now),
    updated: type(Date).default(Date.now),
  });

  static schema = {};

  static version = 0;

  static count(get = {}) {
    return Connection.count({
      model: this,
      get,
    });
  }

  static findOne(get = {}, projection = {}) {
    return Connection.findOne({
      model: this,
      get,
      projection,
    });
  }

  static insertOne(set = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const document: Model = new this(set);
        await document.save();
      } catch (error) {
        reject(error);
      }
    });
  }

  static toJSON(): MaevaModelJSON {
    let name;
    if (typeof this.displayName === 'string') {
      name = this.displayName;
    } else {
      name = this.name;
    }
    const schema = {};
    for (const field in this.schema) {
      schema[field] = this.schema[field].toJSON();
    }
    return {
      collection: this.collectionName || `${name.toLowerCase()}s`,
      schema,
      version: this.version,
    };
  }

}
