import cloneDeep from 'lodash/cloneDeep';

import formatPostInsertDocument from '../queries/formatPostInsertDocument';
import formatPreInsertDocument from '../queries/formatPreInsertDocument';
import requestConnection from '../connect/requestConnection';

const insertMany = (model, documents, _options = {}) =>
new Promise(async (resolve, reject) => {
  try {
    const options = cloneDeep(_options);
    if (!options.connection) {
      options.connection = await requestConnection();
    }
    if (!options.connection.connector) {
      throw new Error('Connection has no connector');
    }
    const $documents = await Promise.all(
      documents.map(doc => formatPreInsertDocument(
        doc,
        model,
        options,
      ))
    );
    const response = await options.connection.connector.actions.insertMany(
      $documents,
      model,
      options,
    );
    const $$documents = await Promise.all(
      response.map(doc => formatPostInsertDocument(
        doc,
        model,
        options,
      ))
    );
    resolve($$documents);
    options.connection.emitter.emit('inserted', {
      documents: $$documents,
      model,
    });
  } catch (error) {
    reject(error);
  }
});

export default insertMany;
