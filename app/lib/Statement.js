// @flow

import Schema from './Schema';

export default class Statement {
  static get(query: Object = {}, schema: Schema) {
    const statement = {};
    for (const field in query) {
      if (typeof query[field] === 'object') {
        Object.assign(statement, {
          [field]: this.get(
            query[field],
            schema.get(field).type.embeddedSchema,
          )
        });
      } else {
        statement[field] = schema.get(field).set(query[field]);
      }
    }
    return statement;
  }
}
