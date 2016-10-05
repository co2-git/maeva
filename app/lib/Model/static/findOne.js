// @flow
import Model from '../../Model';
export
type ARGS = Array<[?Object, ?Object]>;
export
type RETURN = Promise<?Model>;

export default
function findOne(query: Object = {}, options: Object = {}): RETURN {
  return new Promise(async (resolve, reject) => {
    try {
      const {model, statement, conn} = await this.makeStatement(query);
      const found = await conn.operations.findOne({
        model: this,
        collection: this.getCollectionName(),
        query: statement,
        options,
      });
      if (!found) {
        return resolve();
      }
      resolve(new this(found, {
        fromDB: true,
        conn: model.$conn,
      }));
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
