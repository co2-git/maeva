// @flow
import DataDocument from '../defs/DataDocument';
import requestConnection from '../connect/requestConnection';

const findOne = (
  model: DataModel,
  query: Object = {},
  options: Object = {}
): Promise<DataDocument> =>
  new Promise(async (resolve, reject) => {
    let doc: Object = {};
    try {
      const {connector} = options.connection || await requestConnection();
      const results = await connector.actions.findOne(query, model);

      doc = results.connectorResponse.response;
    } catch (error) {
      reject(error);
    } finally {
      resolve(new DataDocument(doc));
    }
  });

export default findOne;
