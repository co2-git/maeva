import getType from '../types/getType';

const validateId = (_id, options = {}) => {
  if (!options.connection.connector) {
    throw new Error('Connection has no connector');
  }

  let id;

  if (
    typeof _id === 'object' &&
    (options.connection.connector.id.name in _id)
  ) {
    id = _id[options.connection.connector.id.name];
  } else {
    id = _id;
  }

  getType(options.connection.connector.id.type).validate(id);
};

export default validateId;
