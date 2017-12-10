import cloneDeep from 'lodash/cloneDeep';

import formatFindQuery from '../queries/formatFindQuery';
import requestConnection from '../connect/requestConnection';

const count = (model, _query = {}, _options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const options = cloneDeep(_options);

      if (!options.connection) {
        options.connection = await requestConnection();
      }

      if (!options.connection.connector) {
        throw new Error('Connection has no connector');
      }

      const query = await formatFindQuery(_query, model, options);

      if (!options.connection.connector.actions) {
        throw new Error('Connector has no actions');
      }

      if (typeof options.connection.connector.actions.count !== 'function') {
        throw new Error('Connector has no count action');
      }

      const results = await options.connection.connector.actions.count(
        query,
        model
      );

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default count;
