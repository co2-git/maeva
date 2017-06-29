// @flow

const onConnect = (connection: DataConnection, fn: Function) => connection.emitter.on('connected', fn);

export default onConnect;
