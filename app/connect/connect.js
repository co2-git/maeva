import EventEmitter from 'events';

import connections from './connections';
import emitter from '../emitter';

const connect = (connector) => {
  const connection = {
    connector,
    emitter: new EventEmitter(),
    status: 'connecting',
  };

  connection.awaitConnection = () => new Promise((resolve, reject) => {
    try {
      if (connection.status === 'connected') {
        resolve();
      } else {
        connection.connector.emitter.on('connected', resolve);
      }
    } catch (error) {
      reject(error);
    }
  });

  connections.push(connection);

  connection.connector.emitter.on('connected', () => {
    connection.status = 'connected';
    connection.emitter.emit('connected', connection);
    emitter.emit('connected', connection);
  });

  connection.connector.emitter.on('disconnected', () => {
    connection.status = 'disconnected';
    connection.emitter.emit('disconnected', connection);
    emitter.emit('disconnected', connection);
  });

  connection.connector.emitter.on('error', (error) => {
    connection.status = 'failed';
    connection.emitter.emit('error', error);
    emitter.emit('error', error);
  });

  setTimeout(() => {
    try {
      connection.connector.actions.connect();
    } catch (error) {
      connection.emitter.emit('error', error);
      emitter.emit('error', error);
    }
  });

  return connection;
};

export default connect;
