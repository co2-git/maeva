import keys from 'lodash/keys';
import requestConnection from '../connect/requestConnection';
import convertFields from '../model/convertFields';

const findMany = (model, query = {}, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {connector} = options.connection || await requestConnection();

      if (keys(query).length) {
        query = await convertFields(query, model, {connector});
      }

      const results = await connector.actions.findMany(query, model);

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default findMany;
