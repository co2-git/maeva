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
      conn = await maeva.connect(::maeva.test);
    });
    describe('connection', () => {
      it('should be a Connection', () => {
        should(conn).be.an.instanceOf(maeva);
      });
    });
  });
});
