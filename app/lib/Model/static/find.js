// @flow
import Model from '../../Model';
export
type ARGS = Array<[?Object, ?Object]>;
export
type RETURN = Promise<Model[]>;

export default function find(query: Object = {}, options: Object = {}): RETURN {
  return new Promise(async (resolve, reject) => {
    try {
      const {model, statement, conn} = await this.makeStatement(query);
      const found = await conn.operations.find({
        model: this,
        collection: this.getCollectionName(),
        query: statement,
        options,
      });
      if (!Array.isArray(found)) {
        return resolve([]);
      }
      const documents = found.map(doc => new this(doc, {
        fromDB: true,
        conn: model.$conn,
      }));
      resolve(documents);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}