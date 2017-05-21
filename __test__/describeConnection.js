/* global describe it */
import EventEmitter from 'events';
import {expect} from 'chai';
import describeConnector from './describeConnector';

const describeConnection = (connection) =>
  describe('Connection', () => {
    console.log(connection);

    describeConnector(connection.connector);

    describe('Emitter', () => {
      it('should have an emitter', () => {
        expect(connection.emitter).to.be.an.instanceof(EventEmitter);
      });
    });

    describe('Status', () => {
      it('should have a status', () => {
        expect(connection.status).to.be.a('string');
      });
    });
  });

export default describeConnection;
