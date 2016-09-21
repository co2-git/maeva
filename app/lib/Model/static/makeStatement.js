// @flow
import Schema from '../../Schema';
import Model from '../../Model';
import set from '../set';

export
type ARGS = Array<[Object]>;
export
type RETURN = Promise<{
  model: Model,
  statement: Object,
}>;

export default function makeStatement(query: Object = {}): RETURN {
  return new Promise(async (resolve, reject) => {
    try {
      const model = new this();
      await model.connect();
      model.$schema = {
        ...model.$schema,
        ...new Schema(model.$conn.schema),
      };
      const statement = {};
      for (const field in query) {
        statement[field] = set(field, query[field], model.$schema);
      }
      resolve({model, statement});
    } catch (error) {
      reject(error);
    }
  });
}
