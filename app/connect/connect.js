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
    console.log('maeva disconnected');
    connection.status = 'disconnected';
    connection.emitter.emit('disconnected', connection);
    emitter.emit('disconnected', connection);
    if (connection.connector.options.keepAlive) {
      setTimeout(connectFn, connection.connector.options.keepAlive);
    }
  });

  connection.connector.emitter.on('error', (error) => {
    connection.emitter.emit('error', error);
    emitter.emit('error', error);
    if (
      (
        connection.status === 'connecting' ||
        connection.status === 'disconnected'
      ) &&
      connection.connector.options.keepAlive
    ) {
      setTimeout(connectFn, connection.connector.options.keepAlive);
    }
  });

  const connectFn = () => {
    try {
      connection.connector.actions.connect();
    } catch (error) {
      connection.emitter.emit('error', error);
      emitter.emit('error', error);
    }
  };

  setTimeout(connectFn);

  return connection;
};

export default connect;
