import getType from '../types/getType';

const convertId = (_id, options = {}) => {
  if (!options.connection.connector) {
    throw new Error('Connection has no connector');
  }

  let __id;

  if (
    typeof _id === 'object' &&
    (options.connection.connector.id.name in _id)
  ) {
    __id = _id[options.connection.connector.id.name];
  } else {
    __id = _id;
  }

  const id = getType(options.connection.connector.id.type).convert(__id);

  return id;
};

export default convertId;
