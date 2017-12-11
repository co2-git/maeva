import cloneDeep from 'lodash/cloneDeep';

import after from '../hooks/after';
import formatFindQuery from '../queries/formatFindQuery';
import formatUpdateQuery from '../queries/formatUpdateQuery';
import requestConnection from '../connect/requestConnection';

const updateMany = (model, _query = {}, _updater = {}, _options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const options = cloneDeep(_options);

      if (!options.connection) {
        options.connection = await requestConnection();
      }

      if (!options.connection.connector) {
        throw new Error('Connection has no connector');
      }
      const query = formatFindQuery(_query, model, options);
      const updater = formatUpdateQuery(_updater, model, options);
      const updated = await options.connection.connector.actions.updateMany(
        query,
        updater,
        model
      );
      await after('update', [...updated], model);
      resolve(updated);
      options.connection.emitter.emit('upated', {
        documents: updated,
        model,
      });
    } catch (error) {
      reject(error);
    }
  });

export default updateMany;
