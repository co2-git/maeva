import requestConnection from '../connect/requestConnection';
import getType from '../types/getType';
import convertId from '../connect/convertId';

const updateByIds = (model, _ids, _updater, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const connection = options.connection || await requestConnection();
      const {connector} = connection;

      const ids = await Promise.all(
        _ids.map(_id => convertId(_id, connection))
      );

      for (const id of ids) {
        getType(connector.id.type).validate(id);
      }

      const results = await connector.actions.updateByIds(ids, _updater, model);

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default updateByIds;
