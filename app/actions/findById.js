import requestConnection from '../connect/requestConnection';
import getType from '../types/getType';
import convertId from '../connect/convertId';

const findById = (model, _id, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const connection = options.connection || await requestConnection();
      const {connector} = connection;

      const id = await convertId(_id, connection);

      getType(connector.id.type).validate(id);

      const results = await connector.actions.findById(id, model);

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default findById;
