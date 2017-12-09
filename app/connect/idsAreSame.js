import first from 'lodash/first';
import shuffle from 'lodash/shuffle';

import getId from './getId';
import connections from './connections';
import link from '../types/link';

const idsAreSame = (idA, idB, connection) => {
  if (connection) {
    connection = connection.connector.id;
  } else {
    if (!connections.length) {
      throw new Error('No connections available');
    }
    connection = first(shuffle(connections));
  }
  const connectorId = getId(connection);
  const _idA = link().convert(idA, {connection});
  const _idB = link().convert(idB, {connection});
  return connectorId.isEqual(_idA, _idB);
};

export default idsAreSame;
