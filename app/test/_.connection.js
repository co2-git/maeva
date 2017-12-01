/* globals describe it */
import 'babel-polyfill';
import * as data from '..';
import connector from '../test-util/connector';
import should from 'should';

describe('Connection', () => {
  let connection;
  it('should connect', () => new Promise(async (resolve, reject) => {
    try {
      connection = data.connect(connector());
      await connection.awaitConnection();
      resolve();
    } catch (error) {
      reject(error);
    }
  }));
  it('should get connector id', () => {
    const id = data.getId();
    should(id).eql(connection.connector.id);
  });
});
