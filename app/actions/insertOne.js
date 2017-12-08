import cloneDeep from 'lodash/cloneDeep';

import formatPreInsertDocument from '../queries/formatPreInsertDocument';
import formatPostInsertDocument from '../queries/formatPostInsertDocument';
import requestConnection from '../connect/requestConnection';

const insertOne = (model = {}, document = {}, _options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const options = cloneDeep(_options);

      if (!options.connection) {
        options.connection = await requestConnection();
      }

      if (!options.connection.connector) {
        throw new Error('Connection has no connector');
      }

      const response = await options.connection.connector.actions.insertOne(
        await formatPreInsertDocument(document, model, options),
        model,
      );

      const doc = await formatPostInsertDocument(response, model, options);

      resolve(doc);

      options.connection.emitter.emit('inserted', {document: doc, model});
    } catch (error) {
      reject(error);
    }
  });

export default insertOne;
