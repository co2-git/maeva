// @flow
import keys from 'lodash/keys';
import pick from 'lodash/pick';
import includes from 'lodash/includes';

import DataDocument from '../defs/DataDocument';
import DataModel from '../defs/DataModel';
import applyDefault from '../model/applyDefault';
import applyValidators from '../model/applyValidators';
import convertFields from '../model/convertFields';
import didInsert from '../model/didInsert';
import maevaError from '../error';
import requestConnection from '../connect/requestConnection';
import validateFields from '../model/validateFields';
import willInsert from '../model/willInsert';

const insertOne = (
  model: MaevaModel = {},
  document: Object = {},
  options: MaevaActionOptions = {}
): Promise<DataDocument> =>
  new Promise(async (resolve, reject) => {
    let doc: Object = {};

    try {
      const {connector} = options.connection || await requestConnection();

      doc = pick(document, keys(model.fields));

      // doc = applyDefault(doc, model);
      //
      // doc = convertFields(doc, model);
      //
      // doc = applyValidators(doc, model);
      //
      // doc = validateFields(doc, model);

      for (const field in model.fields) {
        if (!(field in doc) && includes(model.required, field)) {
          throw maevaError(
            'insertOne',
            'Missing required field',
            {field, model, document: doc}
          );
        }
      }

      // doc = await willInsert(doc, model);

      const response = await connector.actions.insertOne(doc, model);

      // doc = convertFields(doc, model);

      // await didInsert(doc, model);

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export default insertOne;
