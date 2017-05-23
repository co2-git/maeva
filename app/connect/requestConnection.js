// @flow
import filter from 'lodash/filter';
import first from 'lodash/first';
import shuffle from 'lodash/shuffle';

import connections from './connections';
import emitter from '../emitter';
import waitForConnection from './waitForConnection';

const requestConnection = (): Promise<DataConnection> =>
  new Promise(async (resolve, reject) => {
    let connection: DataConnection;

    try {
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
    } catch (error) {
      reject(error);
    } finally {
      resolve(connection);
    }
  });

export default requestConnection;
