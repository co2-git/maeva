import keys from 'lodash/keys';
import requestConnection from '../connect/requestConnection';
import convertFieldsForFind from '../model/convertFieldsForFind';

const removeMany = (model, query = {}, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {connector} = options.connection || await requestConnection();

      if (keys(query).length) {
        query = await convertFieldsForFind(query, model, {connector});
      }

      const results = await connector.actions.removeMany(query, model);

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default removeMany;
