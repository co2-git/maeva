import cloneDeep from 'lodash/cloneDeep';

import formatUpdateQuery from '../queries/formatUpdateQuery';
import getType from '../types/getType';
import link from '../types/link';
import requestConnection from '../connect/requestConnection';

const updateByIds = (model, _ids, _updater, _options = {}) =>
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

    const ids = _ids.map(_id => linkType.convert(_id, options));

    for (const id of ids) {
      linkType.validate(id, options);
    }

    const updater = formatUpdateQuery(_updater, model, options);

    const results = await options.connection.connector.actions.updateByIds(
      ids,
      updater,
      model,
    );

    resolve(results);
  } catch (error) {
    reject(error);
  }
});

export default updateByIds;
