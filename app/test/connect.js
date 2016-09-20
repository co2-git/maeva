/* global describe it before */
import should from 'should';
import maeva from '..';
import mock from '../lib/mock';
import {EventEmitter} from 'events';

describe('Connect', () => {
  describe('Unit', () => {
    it('should be a connection function', () => {
      should(maeva).have.property('connect')
        .which.is.a.Function();
    });
    it('should have an empty connections list', () => {
      should(maeva.connections).be.an.Array()
        .and.have.length(0);
    });
    it('should have an EventEmitter', () => {
      should(maeva.events).be.an.instanceOf(EventEmitter);
    });
    it('should have an index which is 0', () => {
      should(maeva.index).eql(0);
    });
  });
  describe('Connect to test driver', () => {
    let conn;
    before(async () => {
      conn = await maeva.connect(mock());
    });
    describe('connection', () => {
      it('should be a Connection', () => {
        should(conn).be.an.instanceOf(maeva);
      });
      it('should have status connected', () => {
        should(conn.status).be.eql('connected');
      });
      it('should have index 0', () => {
        should(conn.index).eql(0);
      });
      it('should have operations', () => {
        should(conn).have.property('operations').which.is.an.Object();
      });
      it('should have operation find', () => {
        should(conn.operations).have.property('find').which.is.a.Function();
      });
      it('should have operation insert', () => {
        should(conn.operations).have.property('insert').which.is.a.Function();
      });
      it('should have operation update', () => {
        should(conn.operations).have.property('update').which.is.a.Function();
      });
      it('should have operation remove', () => {
        should(conn.operations).have.property('remove').which.is.a.Function();
      });
      describe.skip('Ready function', () => {
        it('should be ready now', () => 1);
      });
    });
    describe('connections', () => {
      it('should have 1 connection in list', () => {
        should(maeva.connections).have.length(1);
      });
      it('should be last connection', () => {
        should(maeva.connections[0]).eql(conn);
      });
    });
  });
  describe('Connect to another test driver', () => {
    let conn;
    before(async () => {
      conn = await maeva.connect(mock());
    });
    describe('connection', () => {
      it('should be a Connection', () => {
        should(conn).be.an.instanceOf(maeva);
      });
      it('should have status connected', () => {
        should(conn.status).be.eql('connected');
      });
      it('should have index 1', () => {
        should(conn.index).eql(1);
      });
    });
    describe('connections', () => {
      it('should have 2 connection in list', () => {
        should(maeva.connections).have.length(2);
      });
      it('should be last connection', () => {
        should(maeva.connections[1]).eql(conn);
      });
    });
  });
  describe('Disconnect', () => {
    describe('locally', () => {
      it('should disconnect 1st connection locally', async () => {
        await maeva.connections[0].disconnect();
      });
      describe('connection', () => {
        it('should have status disconnected', () => {
          should(maeva.connections[0].status).be.eql('disconnected');
        });
      });
    });
    describe('globally', () => {
      it('should disconnect 2nd connection globally', async () => {
        await maeva.disconnect();
      });
      describe('connection', () => {
        it('should have status disconnected', () => {
          should(maeva.connections[1].status).be.eql('disconnected');
        });
      });
    });
  });
});
