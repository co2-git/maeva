/* global describe */
import connect from '../../__dist__/connect/connect';
import describeConnection from './describeConnection';
import DataConnector from '../../__dist__/defs/DataConnector';

const fn = () => 1;

const fakeConnection = new DataConnector({
  actions: {
    connect: fn,
    count: fn,
    disconnect: fn,
    findMany: fn,
    findOne: fn,
    insertMany: fn,
    insertOne: fn,
    removeMany: fn,
    removeOne: fn,
    updateMany: fn,
    updateOne: fn,
  },
  status: 'loading',
});

const describeConnect = () => describe('Connect', () => {
  describe('Connection', () => {
    describe('should return a connection', () => {
      describeConnection(connect(fakeConnection));
    });
  });
});

export default describeConnect;