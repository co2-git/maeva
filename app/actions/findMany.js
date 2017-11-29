// @flow
import keys from 'lodash/keys';
import DataDocument from '../defs/DataDocument';
import DataModel from '../defs/DataModel';
import requestConnection from '../connect/requestConnection';
import convertFields from '../model/convertFields';

const findMany = (
  model: DataModel,
  query: Object = {},
  options: Object = {}
): Promise<DataDocument> =>
  new Promise(async (resolve, reject) => {
    try {
      const {connector} = options.connection || await requestConnection();

      if (keys(query).length) {
        query = convertFields(query, model, {connector});
      }

      const results = await connector.actions.findMany(query, model);

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default findMany;
