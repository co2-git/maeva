import should from 'should';
import maeva, * as other from '..';
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
      conn = await maeva.connect(maeva.test());
    });
    describe('connection', () => {
      it('should be a Connection', () => {
        should(conn).be.an.instanceOf(maeva);
      });
      it('should be connected', () => {
        should(conn.connected).be.true();
      });
      it('should not be connected', () => {
        should(conn.disconnected).be.false();
      });
      it('should have index 0', () => {
        should(conn.index).eql(0);
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
      conn = await maeva.connect(maeva.test());
    });
    describe('connection', () => {
      it('should be a Connection', () => {
        should(conn).be.an.instanceOf(maeva);
      });
      it('should be connected', () => {
        should(conn.connected).be.true();
      });
      it('should not be connected', () => {
        should(conn.disconnected).be.false();
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
        it('should not be connected', () => {
          should(maeva.connections[0].connected).be.false();
        });
        it('should not be disconnected', () => {
          should(maeva.connections[0].disconnected).be.true();
        });
      });
    });
    describe('globally', () => {
      it('should disconnect 2nd connection globally', async () => {
        await maeva.disconnect();
      });
      describe('connection', () => {
        it('should not be connected', () => {
          should(maeva.connections[1].connected).be.false();
        });
        it('should not be disconnected', () => {
          should(maeva.connections[1].disconnected).be.true();
        });
      });
    });
  });
});
