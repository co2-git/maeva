// @flow

import Connection from '../../Connection';

export default
function findById(id: any, options: $options = {}): Promise<?$Model> {
  return new Promise(async (resolve, reject) => {
    try {
      let conn: Connection;
      if (options.conn) {
        conn = options.conn;
      } else {
        // $FlowFixMe: suppressing this error until we can refactor
        conn = await Connection.findConnection();
      }
      const found = await conn.operations.findById({
        model: this,
        collection: this._getCollectionName(),
        id,
        options,
      });
      if (!found) {
        return resolve();
      }
      const doc = new this(found, {
        fromDB: true,
        conn,
      });
      resolve(doc);
    } catch (error) {
      reject(error);
    }
  });
}
