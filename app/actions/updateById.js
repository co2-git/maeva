import requestConnection from '../connect/requestConnection';
import getType from '../types/getType';

const updateById = (model, _id, _updater, options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {connector} = options.connection || await requestConnection();

      let __id;

      if (typeof _id === 'object' && (connector.id.name in _id)) {
        __id = _id[connector.id.name];
      } else {
        __id = _id;
      }

      const id = getType(connector.id.type).convert(__id);

      getType(connector.id.type).validate(id);

      const results = await connector.actions.updateById(id, _updater, model);

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default updateById;
