// @flow
import DataDocument from '../defs/DataDocument';
import requestConnection from '../connect/requestConnection';

const findMany = (
  model: DataModel,
  query: Object = {},
  options: Object = {}
): Promise<DataDocument> =>
  new Promise(async (resolve, reject) => {
    let docs: Object[] = [];
    try {
      const {connector} = options.connection || await requestConnection();
      const results = await connector.actions.findMany(query, model);

      docs = results.connectorResponse.response;
    } catch (error) {
      reject(error);
    } finally {
      resolve(docs.map(doc => new DataDocument(doc)));
    }
  });

export default findMany;
