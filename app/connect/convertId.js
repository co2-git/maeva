import requestConnection from '../connect/requestConnection';
import getType from '../types/getType';

const convertId = (_id, connection) => new Promise(async (resolve, reject) => {
  try {
    const {connector} = connection || await requestConnection();

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

    resolve(id);
  } catch (error) {
    reject(error);
  }
});

export default convertId;
