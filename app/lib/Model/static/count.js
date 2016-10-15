// @flow

import Model from '../../Model';
import Schema from '../../Schema';
import Statement from '../../Statement';
import Connection from '../../Connection';

export default
function count(query: Object = {}, options: Object = {}): Promise<Model[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const conn = await Connection.findConnection();
      const get = Statement.get(query, new Schema({
        ...conn.schema,
        ...this._getSchema(),
      }));
      const number = await conn.operations.count({
        model: this,
        collection: this._getCollectionName(),
        get,
        options,
      });
      resolve(number);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
