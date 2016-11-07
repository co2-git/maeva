// @flow
import Schema from '../../Schema';
import Connection from '../../Connection';
import Statement from '../../Statement';
import Model from '../../Model';

export default
function findOne(query: $fields = {}, options: $options = {}): Promise<?Model> {
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
