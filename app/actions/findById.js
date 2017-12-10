import cloneDeep from 'lodash/cloneDeep';

import requestConnection from '../connect/requestConnection';
import getType from '../types/getType';
import link from '../types/link';

const findById = (model, _id, _options = {}) =>
new Promise(async (resolve, reject) => {
  try {
    const options = cloneDeep(_options);

    if (!options.connection) {
      options.connection = await requestConnection();
    }

    if (!options.connection.connector) {
      throw new Error('Connection has no connector');
    }

    const id = getType(link()).convert(_id, options);

    getType(link()).validate(id, options);

    const results = await options.connection.connector.actions.findById(
      id,
      model
    );

    resolve(results);
  } catch (error) {
    reject(error);
  }
});

export default findById;
