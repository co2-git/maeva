/**
 *  ****************************************************************************
 *  @module module
 *  @name name
 *  @description description
 *  @author francois
 *  @license MIT
 *  @type function
 *  @flow
 *  ****************************************************************************
**/

import Schema from '../../Schema';
import Statement from '../../Statement';
import Connection from '../../Connection';

export default function count(
  query: $fields = {},
  options: $options & $get$options = {}): Promise<number> {
  return new Promise(async (resolve, reject) => {
    try {
      let conn: ?Connection;
      if (options.conn) {
        conn = options.conn;
      } else {
        conn = await Connection.findConnection();
      }
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
