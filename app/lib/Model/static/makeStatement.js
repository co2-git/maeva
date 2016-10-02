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
      for (const field in query) {
        try {
          statement[field] = set(field, query[field], model.$schema);
          if (!statement[field].$_maevaFieldSchema) {
            if (typeof statement[field] === 'object') {
              Object.defineProperty(statement[field], '$_maevaFieldSchema', {
                enumerable: false,
                value: model.$schema[field],
              });
            } else {
              statement[field].$_maevaFieldSchema = model.$schema[field];
            }
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
