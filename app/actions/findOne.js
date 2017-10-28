// @flow
import DataDocument from '../defs/DataDocument';
import DataModel from '../defs/DataModel';
import requestConnection from '../connect/requestConnection';
import convertFields from '../model/convertFields';

const findOne = (
  _model: DataModel,
  _query: Object = {},
  options: Object = {}
): Promise<DataDocument> =>
  new Promise(async (resolve, reject) => {
    let doc: Object = {};
    try {
      let model = _model;
      if (!(model instanceof DataModel)) {
        model = new DataModel(_model);
      }

      const {connector} = options.connection || await requestConnection();

      const query = convertFields(_query, model);

      const results = await connector.actions.findOne(query, model);

      doc = results.connectorResponse.response;

      resolve(new DataDocument(doc));
    } catch (error) {
      reject(error);
    }
  });

export default findOne;
