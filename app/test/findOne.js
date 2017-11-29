/* globals describe it before */
import connection from '../test-util/connector';
import * as data from '../';
import should from 'should';

const model = data.model('findOne', {foo: Number});

describe('Find One', () => {
  let found;
  before(async () => {
    await data.insertOne(model, {foo: 42}, {connection});
    found = await data.findOne(model, {}, {connection});
  });
  describe('Find without query', () => {
    it('should find inserted document', () => {
      should(found).have.property('id').which.eql(0);
      should(found).have.property('foo').which.eql(42);
    });
  });
  describe('Find with query', () => {
    before(async () => {
      await data.insertOne(model, {foo: 100}, {connection});
      await data.insertOne(model, {foo: 1000}, {connection});
      found = await data.findOne(model, {foo: 100}, {connection});
    });
    it('should find inserted document', () => {
      should(found).have.property('id');
      should(found).have.property('foo').which.eql(100);
    });
  });
});
