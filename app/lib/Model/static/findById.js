// @flow

import MaevaError from '../../Error';
import Schema from '../../Schema';
import Connection from '../../Connection';
import Statement from '../../Statement';

type OPTIONS = {
  conn?: Connection,
};

export default function findById(id: any, options: OPTIONS = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      let conn;
      if (options.conn) {
        conn = options.conn;
      } else {
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
      console.log(error.stack);
      reject(error);
    }
  });
}
