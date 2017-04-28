// @flow
import Connection from '../Connection';

export default class StaticModel {

  static collectionName = '';

  static size: ?number = null;

  static schema: MaevaSchema = {};

  static version = 0;

  static count(get = {}) {
    return Connection.count({
      model: this,
      get,
    });
  }

  static findOne(get = {}, projection = {}) {
    return Connection.findOne({
      get,
      model: this,
      projection,
    });
  }

  static insertOne(set = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const document: Model = new this(set);
        await document.insert();
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
