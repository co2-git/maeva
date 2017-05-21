// @flow
import filter from 'lodash/filter';
import first from 'lodash/first';
import shuffle from 'lodash/shuffle';
import MaevaConnection from './defs/MaevaConnection';
import connections from './connections';
import emitter from './emitter';
import waitForConnection from './waitForConnection';

const requestConnection = () => new Promise(async (resolve, reject) => {
  try {
    let connection: MaevaConnection;
    const availableConnections = filter(
      connections,
      conn => conn.status === 'connected',
    );
    if (availableConnections.length) {
      connection = first(shuffle(availableConnections));
    } else {
      connection = await new Promise((resolveConnected) => {
        emitter.on('connected', resolveConnected);
      });
    }
    await waitForConnection(connection);
    resolve(connection);
  } catch (error) {
    reject(error);
  }
});

export default requestConnection;
