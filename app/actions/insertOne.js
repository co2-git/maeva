import keys from 'lodash/keys';
import pick from 'lodash/pick';
import includes from 'lodash/includes';

import applyDefault from '../model/applyDefault';
import applyValidators from '../model/applyValidators';
import convertFields from '../model/convertFields';
import didInsert from '../model/didInsert';
import maevaError from '../error';
import requestConnection from '../connect/requestConnection';
import validateFields from '../model/validateFields';
import willInsert from '../model/willInsert';

const insertOne = (model = {}, document = {}, options = {}) =>
  new Promise(async (resolve, reject) => {
    let doc: Object = {};

    try {
      const connection = options.connection || await requestConnection();
      const {connector} = connection;

      doc = pick(document, keys(model.fields));

      doc = applyDefault(doc, model);

      doc = await convertFields(doc, model, {connector});

      doc = applyValidators(doc, model);

      await validateFields(doc, model, {connector});

      for (const field in model.fields) {
        if (!(field in doc) && includes(model.options.required, field)) {
          throw maevaError(
            'insertOne',
            'Missing required field',
            {field, model, document: doc}
          );
        }
      }

      doc = await willInsert(doc, model);

      const response = await connector.actions.insertOne(doc, model);

      doc = pick(response, keys(model.fields));

      doc = await convertFields(doc, model);

      if (connector.id) {
        doc[connector.id.name] = response[connector.id.name];
      }

      await didInsert(doc, model);

      resolve(doc);

      connection.emitter.emit('inserted', {document: doc, model});
    } catch (error) {
      reject(error);
    }
  });

export default insertOne;
