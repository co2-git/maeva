// @flow
import Schema from '../../Schema';
import Connection from '../../Connection';
import Statement from '../../Statement';
import Model from '../../Model';
export
type ARGS = Array<[?Object, ?Object]>;
export
type RETURN = Promise<?Model>;

export default
function findOne(query: Object = {}, options: Object = {}): RETURN {
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
      const found = await conn.operations.findOne({
        model: this,
        collection: this._getCollectionName(),
        get,
        options,
      });
      if (!found) {
        return resolve();
      }
      resolve(new this(found, {
        fromDB: true,
        conn,
      }));
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
