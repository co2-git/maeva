// @flow
import pick from 'lodash/pick';
import keys from 'lodash/keys';
import requestConnection from './requestConnection';
import applyDefaults from './applyDefaults';
import convertFields from './convertFields';
import applyValidators from './applyValidators';
import maevaError from './error';
import MaevaDocument from './defs/MaevaDocument';
import validateFields from './validateFields';
import willInsert from './willInsert';
import didInsert from './didInsert';

const insertOne = (model: Object, document: Object, options: Object = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {connector} = options.connection || await requestConnection();

      console.log({document});

      let doc = pick(document, keys(model.fields));

      console.log({docFields: doc});

      doc = applyDefaults(doc, model);

      console.log({applyDefaults: doc});

      doc = convertFields(doc, model);

      console.log({convertFields: doc});

      doc = applyValidators(doc, model);

      console.log({applyValidators: doc});

      doc = validateFields(doc, model);

      console.log({validateFields: doc});

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

      console.log({willInsert: doc});

      const {connectorResponse} = await connector.actions.insertOne(doc, model);

      doc = connectorResponse.response[0];

      console.log({insertOne: doc});

      doc = convertFields(doc, model);

      console.log({convertFields: doc});

      await didInsert(doc, model);

      resolve(new MaevaDocument(doc));
    } catch (error) {
      reject(error);
    }
  });

export default insertOne;
