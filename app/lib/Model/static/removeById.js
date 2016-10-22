// @flow

import Connection from '../../Connection';

export default function removeById(
  id: any,
  options: Object = {}
): Promise<number> {
  return new Promise(async (resolve, reject) => {
    try {
      let conn;
      if (options.conn) {
        conn = options.conn;
      } else {
        conn = await Connection.findConnection();
      }
      const removed = await conn.operations.removeById({
        model: this,
        collection: this._getCollectionName(),
        id,
        options,
      });
      resolve(removed.result);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
