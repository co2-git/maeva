import first from 'lodash/first';
import shuffle from 'lodash/shuffle';

import connections from './connections';

const getId = (connection) => {
  if (connection) {
    return connection.connector.id;
  }
  if (!connections.length) {
    throw new Error('No connections available');
  }
  return first(shuffle(connections)).connector.id;
};

export default getId;
