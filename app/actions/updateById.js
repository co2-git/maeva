import cloneDeep from 'lodash/cloneDeep';

import formatUpdateQuery from '../queries/formatUpdateQuery';
import getType from '../types/getType';
import link from '../types/link';
import requestConnection from '../connect/requestConnection';

const updateById = (model, _id, _updater, _options = {}) =>
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

    const updater = formatUpdateQuery(_updater, model, options);

    const updated = await options.connection.connector.actions.updateById(
      id,
      updater,
      model,
    );

    resolve(updated);

    options.connection.emitter.emit('upated', {
      documents: [updated],
      model,
    });
  } catch (error) {
    reject(error);
  }
});

export default updateById;
