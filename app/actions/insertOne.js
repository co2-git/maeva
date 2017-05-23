// @flow
import keys from 'lodash/keys';
import pick from 'lodash/pick';

import DataDocument from '../defs/DataDocument';
import applyDefaults from '../model/applyDefaults';
import applyValidators from '../model/applyValidators';
import convertFields from '../model/convertFields';
import didInsert from '../model/didInsert';
import maevaError from '../error';
import requestConnection from '../connect/requestConnection';
import validateFields from '../model/validateFields';
import willInsert from '../model/willInsert';

const insertOne = (
  model: DataModel,
  document: Object,
  options: Object = {}
): Promise<DataDocument> =>
  new Promise(async (resolve, reject) => {
    let doc: Object = {};

    try {
      const {connector} = options.connection || await requestConnection();

      doc = pick(document, keys(model.fields));

      doc = applyDefaults(doc, model);

      doc = convertFields(doc, model);

      doc = applyValidators(doc, model);

      doc = validateFields(doc, model);

      for (const field in model.fields) {
        if (!(field in doc)) {
          throw maevaError(
            'insertOne',
            'Missing field',
            {field, model, document: doc}
          );
        }
      }

      doc = await willInsert(doc, model);

      const {connectorResponse} = await connector.actions.insertOne(doc, model);

      doc = connectorResponse.response[0];

      doc = convertFields(doc, model);

      await didInsert(doc, model);
    } catch (error) {
      reject(error);
    } finally {
      resolve(new DataDocument(doc));
    }
  });

export default insertOne;
