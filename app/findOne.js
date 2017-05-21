// @flow
import requestConnection from './requestConnection';
import MaevaDocument from './defs/MaevaDocument';

const findOne = (model: Object, query: Object = {}, options: Object = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {connector} = options.connection || await requestConnection();
      console.log({query});
      const results = await connector.actions.findOne(query, model);
      console.log({results});
      const doc = results.connectorResponse.response;
      console.log({doc});
      resolve(new MaevaDocument(doc));
    } catch (error) {
      reject(error);
    } finally {
      resolve();
    }
  });

export default findOne;
