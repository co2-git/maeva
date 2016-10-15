// @flow

import Statement from '../../Statement';
import Connection from '../../Connection';
import Schema from '../../Schema';

export default function remove(
  query: ?Object = {},
  modifier: Object,
  options: Object = {}
): Promise<number> {
  return new Promise(async (resolve, reject) => {
    try {
      const conn = await Connection.findConnection();
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
      resolve(removed);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
