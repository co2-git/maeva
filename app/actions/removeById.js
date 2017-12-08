import cloneDeep from 'lodash/cloneDeep';
import requestConnection from '../connect/requestConnection';
import convertId from '../connect/convertId';
import validateId from '../connect/validateId';

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

    const id = convertId(_id, options);

    validateId(id, options);

    const results = await options.connection.connector.actions.removeById(
      id,
      model
    );

    resolve(results);
  } catch (error) {
    reject(error);
  }
});

export default removeById;
