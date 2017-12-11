import cloneDeep from 'lodash/cloneDeep';

import after from '../hooks/after';
import getType from '../types/getType';
import link from '../types/link';
import requestConnection from '../connect/requestConnection';

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

      const linkType = getType(link());

      const ids = await Promise.all(
        _ids.map(_id => linkType.convert(_id, options))
      );

      for (const id of ids) {
        linkType.validate(id, options);
      }

      const removed = await options.connection.connector.actions.removeByIds(
        ids,
        model
      );

      await after('remove', [...removed], model);

      resolve(removed);

      options.connection.emitter.emit('removed', {
        documents: removed,
        model,
      });
    } catch (error) {
      reject(error);
    }
  });

export default removeByIds;
