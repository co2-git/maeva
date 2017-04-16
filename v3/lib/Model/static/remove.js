// @flow

import Statement from '../../Statement';
import Connection from '../../Connection';
import Schema from '../../Schema';

export default function remove(
  query: $fields = {},
  options: $options = {}
): Promise<number> {
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
      const removed = await conn.operations.remove({
        model: this,
        collection: this._getCollectionName(),
        get,
        options,
      });
      resolve(removed.result);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
