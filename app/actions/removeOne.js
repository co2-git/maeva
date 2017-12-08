import cloneDeep from 'lodash/cloneDeep';
import requestConnection from '../connect/requestConnection';
import formatFindQuery from '../queries/formatFindQuery';

const removeOne = (model, _query = {}, _options = {}) =>
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

    const results = await options.connection.connector.actions.removeOne(
      query,
      model
    );

    resolve(results);
  } catch (error) {
    reject(error);
  }
});

export default removeOne;
