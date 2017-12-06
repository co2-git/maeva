const onConnect = (connection, fn) => connection.emitter.on('connected', fn);
export default onConnect;
