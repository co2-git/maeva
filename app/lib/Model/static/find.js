// @flow

import Model from '../../Model';
import Schema from '../../Schema';
import Statement from '../../Statement';
import Connection from '../../Connection';

export default
function find(query: Object = {}, options: Object = {}): Promise<Model[]> {
  return new Promise(async (resolve, reject) => {
    try {
      let conn;
      if (options.conn) {
        conn = options.conn;
      } else {
        conn = await Connection.findConnection();
      }
      const get = Statement.get(query, new Schema({
        ...conn.schema,
        ...this._getSchema(),
      }));
      const found = await conn.operations.find({
        model: this,
        collection: this._getCollectionName(),
        get,
        options,
      });
      if (!Array.isArray(found)) {
        return resolve([]);
      }
      const documents = found.map(doc => new this(doc, {
        fromDB: true,
        conn: conn,
      }));
      resolve(documents);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
