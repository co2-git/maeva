import formatPostInsertDocument from '../model/formatPostInsertDocument';
import formatPreInsertDocument from '../model/formatPreInsertDocument';
import requestConnection from '../connect/requestConnection';

const insertMany = (model, documents, options = {}) =>
new Promise(async (resolve, reject) => {
  try {
    const connection = options.connection || await requestConnection();
    const {connector} = connection;
    const $documents = await Promise.all(
      documents.map(doc => formatPreInsertDocument(
        model,
        doc,
        connection,
      ))
    );
    const response = await connector.actions.insertMany(
      $documents,
      model,
    );
    const $$documents = await Promise.all(
      response.map(doc => formatPostInsertDocument(
        model,
        doc,
        connection,
      ))
    );
    resolve($$documents);
    connection.emitter.emit('inserted', {documents: $$documents, model});
  } catch (error) {
    reject(error);
  }
});

export default insertMany;
