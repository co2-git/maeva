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

      let id;

      const convertedId = getType(connector.id.type).convert(__id);

      if (convertedId instanceof Promise) {
        try {
          id = await convertedId;
        } catch (error) {
          throw error;
        }
      } else {
        id = convertedId;
      }

      getType(connector.id.type).validate(id);

      const results = await connector.actions.updateById(id, _updater, model);

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export default updateById;
