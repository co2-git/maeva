// @flow
import Model from '../../Model';
import Connection from '../../Connection';
import set from '../set';

export
type ARGS = [Object];
export
type RETURN = Promise<{
  model: Model,
  statement: Object,
  conn: Connection,
}>;

export default function makeStatement(query: Object = {}): RETURN {
  return new Promise(async (resolve, reject) => {
    try {
      const conn = await Connection.findConnection();
      const model = new this({}, {conn});
      const statement = {};
      for (const field in query) {
        statement[field] = set(field, query[field], model.$schema);
        if (!statement[field].$_maevaFieldSchema) {
          Object.defineProperty(statement[field], '$_maevaFieldSchema', {
            enumerable: false,
            value: model.$schema[field],
          });
        }
      }
      resolve({model, statement, conn});
    } catch (error) {
      reject(error);
    }
  });
}
