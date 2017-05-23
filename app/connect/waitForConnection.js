// @flow

const waitForConnection = (connection: DataConnection): Promise<void> =>
  new Promise((resolve, reject) => {
    switch (connection.status) {
    case 'connecting':
      connection.emitter.on('connected', resolve);
      break;
    case 'connected':
      resolve();
      break;
    case 'disconnecting':
    case 'disconnected':
    case 'failed':
      reject(new Error(`Can not connect, connection is ${connection.status}`));
      break;
    }
  });

export default waitForConnection;
