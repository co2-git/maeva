import cloneDeep from 'lodash/cloneDeep';

import getType from '../types/getType';
import link from '../types/link';
import requestConnection from '../connect/requestConnection';

const removeById = (model, _id, _options = {}) =>
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

    const id = linkType.convert(_id, options);

    linkType.validate(id, options);

    const removed = await options.connection.connector.actions.removeById(
      id,
      model
    );

    resolve(removed);

    options.connection.emitter.emit('removed', {
      documents: [removed],
      model,
    });
  } catch (error) {
    reject(error);
  }
});

export default removeById;
