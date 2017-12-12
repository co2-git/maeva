const onDisconnect = (connection, fn) =>
  connection.emitter.on('disconnected', fn);
export default onDisconnect;
