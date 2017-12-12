import connections from '../connect/connections';

const onDisconnect = (fn) => {
  for (const connection of connections) {
    connection.emitter.on('disconnected', fn);
  }
};

export default onDisconnect;
