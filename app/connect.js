// @flow
import EventEmitter from 'events';
import connections from './connections';
import emitter from './emitter';
import MaevaConnection from './defs/MaevaConnection';
import MaevaConnector from './defs/MaevaConnector';

const connect = (
  connector: MaevaConnector
): MaevaConnection => {
  const connection: MaevaConnection = new MaevaConnection({
    connector,
    emitter: new EventEmitter(),
    status: 'connecting',
  });

  connections.push(connection);

  connection.connector.actions.connect();

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

  return connection;
};

export default connect;
