// @flow
import keys from 'lodash/keys';
import pick from 'lodash/pick';

import DataModel from '../defs/DataModel';
import convertFields from '../model/convertFields';
import requestConnection from '../connect/requestConnection';

const count = (_model = {}, document = {}, options = {}): Promise<number> =>
new Promise(async (resolve, reject) => {
  try {
    let model = _model;

    if (!(model instanceof DataModel)) {
      model = new DataModel(_model);
    }

    const {connector} = options.connection || await requestConnection();

    const doc = convertFields(pick(document, keys(model.fields)), model);

    const {connectorResponse} = await connector.actions.count(doc, model);

    const number = connectorResponse.response;

    resolve(number);
  } catch (error) {
    reject(error);
  }
});

export default count;
