import cloneDeep from 'lodash/cloneDeep';

import formatFindQuery from '../queries/formatFindQuery';
import requestConnection from '../connect/requestConnection';

const removeMany = (model, query = {}, _options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const options = cloneDeep(_options);

      if (!options.connection) {
        options.connection = await requestConnection();
      }

      if (!options.connection.connector) {
        throw new Error('Connection has no connector');
      }

      query = await formatFindQuery(query, model, options);

      const results = await options.connection.connector.actions.removeMany(
        query,
        model,
      );

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default removeMany;
