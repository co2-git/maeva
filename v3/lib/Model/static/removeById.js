// @flow

import Connection from '../../Connection';

export default function removeById(
  id: any,
  options: $options = {}
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let conn;
      if (options.conn) {
        conn = options.conn;
      } else {
        conn = await Connection.findConnection();
      }
      await conn.operations.removeById({
        model: this,
        collection: this._getCollectionName(),
        id,
        options,
      });
      resolve(id);
    } catch (error) {
      reject(error);
    }
  });
}
