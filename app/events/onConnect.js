import connections from '../connect/connections';

const onConnect = (fn) => {
  for (const connection of connections) {
    connection.emitter.on('connected', fn);
  }
};

export default onConnect;
