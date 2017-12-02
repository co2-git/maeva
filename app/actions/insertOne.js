import formatPreInsertDocument from '../model/formatPreInsertDocument';
import formatPostInsertDocument from '../model/formatPostInsertDocument';
import requestConnection from '../connect/requestConnection';

const insertOne = (model = {}, document = {}, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const connection = options.connection || await requestConnection();
      const {connector} = connection;

      const response = await connector.actions.insertOne(
        await formatPreInsertDocument(model, document, connection),
        model,
      );

      const doc = await formatPostInsertDocument(model, response, connection);

      resolve(doc);

      connection.emitter.emit('inserted', {document: doc, model});
    } catch (error) {
      reject(error);
    }
  });

export default insertOne;
