// @flow

import _ from 'lodash';
import Schema from './Schema';
import isObject from './utils/isObject';

export default class Statement {
  static get(query: $fields = {}, schema: Schema): $fields {
    const statement = {};
    for (const field in query) {
      if (/^\$/.test(field)) {
        if (_.includes(['$not', '$or'], field)) {
          if (isObject(query[field])) {
            Object.assign(statement, {
              [field]: this.get(
                query[field],
                schema,
              )
            });
          } else if (Array.isArray(query[field])) {
            statement[field] = query[field].map(qy => this.get(qy, schema));
          }
        }
      } else if (typeof query[field] === 'object') {
        if (query[field] instanceof RegExp) {
          statement[field] = query[field];
        } else {
          const keys = Object.keys(query[field]);
          const hasMetaQuery = keys.some(key => /^\$/.test(key));
          if (hasMetaQuery) {
            const metaQuery = keys[0];
            if (_.includes(['$not', '$lt', '$lte', '$gt', '$gte'], metaQuery)) {
              Object.assign(statement, {
                [field]: {
                  [metaQuery]: this.get(
                    {[field]: query[field][metaQuery]},
                    schema,
                  )[field]
                }
              });
            } else if (_.includes(['$in', '$between'], metaQuery)) {
              statement[field] = {
                [metaQuery]: query[field][metaQuery].map(vin => this.get(
                  {[field]: vin},
                  schema,
                )[field])
              };
            } else if (_.includes(['$has'], metaQuery)) {
              statement[field] = query[field];
            }
          } else {
            Object.assign(statement, {
              [field]: this.get(
                query[field],
                schema.get(field).type.embeddedSchema,
              )
            });
          }
        }
      } else {
        statement[field] = schema.get(field).set(query[field]);
      }
    }
    return statement;
  }
}
