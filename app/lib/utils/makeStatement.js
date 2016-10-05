// @flow
import MaevaError from '../Error';
import Schema from '../Schema';
import set from './set';

export default
function makeStatement(query: Object = {}, schema: Schema|Object = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const statement = {};
      Object.defineProperty(statement, '$$structure', {
        enumerable: false,
        value: {},
        writable: true,
      });
      for (const field in query) {
        try {
          statement[field] = set(field, query[field], schema);
          if (!statement.$$structure[field]) {
            statement.$$structure[field] = schema[field];
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
      resolve(statement);
    } catch (error) {
      reject(error);
    }
  });
}
