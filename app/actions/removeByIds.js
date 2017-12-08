import cloneDeep from 'lodash/cloneDeep';

import requestConnection from '../connect/requestConnection';
import convertId from '../connect/convertId';
import validateId from '../connect/validateId';

const removeByIds = (model, _ids, _options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const options = cloneDeep(_options);

      if (!options.connection) {
        options.connection = await requestConnection();
      }

      if (!options.connection.connector) {
        throw new Error('Connection has no connector');
      }

      const ids = await Promise.all(
        _ids.map(_id => convertId(_id, options))
      );

      for (const id of ids) {
        validateId(id, options);
      }

      const results = await options.connection.connector.actions.removeByIds(
        ids,
        model
      );

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default removeByIds;
