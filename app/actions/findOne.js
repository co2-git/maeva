import keys from 'lodash/keys';
import DataDocument from '../defs/DataDocument';
import DataModel from '../defs/DataModel';
import requestConnection from '../connect/requestConnection';
import convertFields from '../model/convertFields';

const findOne = (
  model: DataModel,
  query: Object = {},
  options: Object = {}
): Promise<DataDocument> =>
  new Promise(async (resolve, reject) => {
    try {
      const {connector} = options.connection || await requestConnection();

      if (keys(query).length) {
        query = await convertFields(query, model, {connector});
      }

      const results = await connector.actions.findOne(query, model);

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default findOne;
