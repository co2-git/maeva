// @flow
import MaevaError from '../../Error';

export default function findById(id: any, options: Object = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const {model} = await this.makeStatement({});
      if (!model.$conn.id) {
        throw new MaevaError('Id not supported by vendor');
      }
      const idName = model.$conn.id.name;
      const statementId = model.set(idName, id)[idName];
      const found = await model.$conn.operations.findById({
        model: this,
        collection: this._getCollectionName(),
        id: statementId,
        options,
      });
      if (!found) {
        return resolve();
      }
      const doc = new this(found, {
        fromDB: true,
        conn: model.$conn,
      });
      resolve(doc);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
