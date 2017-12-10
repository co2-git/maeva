import first from 'lodash/first';
import shuffle from 'lodash/shuffle';

import connections from './connections';

const getIdName = (connection) => {
  let conn;
  if (connection) {
    conn = connection;
  } else {
    conn = first(shuffle(connections));
  }
  if (!conn) {
    throw new Error('Can not get id name: no connection found');
  }
  if (!conn.connector) {
    throw new Error('Can not get id name: connection has no connector');
  }
  if (!conn.connector.idName) {
    throw new Error(
      'Can not get id name: ' +
      `connector ${conn.connector.name} did not declare its id name`
    );
  }
  if (typeof conn.connector.idName === 'function') {
    return conn.connector.idName();
  }
  return conn.connector.idName;
};

export default getIdName;
