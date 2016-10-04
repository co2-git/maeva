// @flow
import Model from '../../Model';
import Connection from '../../Connection';
import MaevaError from '../../Error';
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
      Object.defineProperty(statement, '$$structure', {
        enumerable: false,
        value: {},
        writable: true,
      });
      for (const field in query) {
        try {
          statement[field] = set(field, query[field], model.$schema);
          if (!statement.$$structure[field]) {
            statement.$$structure[field] = model.$schema[field];
          }
        } catch (error) {
          throw MaevaError.rethrow(
            error,
            'Could not make statement from field',
            {
              field,
              statement: statement[field],
            }
          );
        }
      }
      resolve({model, statement, conn});
    } catch (error) {
      reject(error);
    }
  });
}
