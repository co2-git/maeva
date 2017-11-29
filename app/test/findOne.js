/* globals describe it before */
import connection from '../test-util/connector';
import * as data from '../';
import should from 'should';

const model = data.model('findOne', {foo: Number});
const modelB = data.model('modelB', {name: String});
const modelA = data.model('modelA', {name: String, b: data.link(modelB)});

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
  describe('Find with link', () => {
    let b;
    before(async () => {
      b = await data.insertOne(modelB, {name: 'B'}, {connection});
      await data.insertOne(modelA, {name: 'A', b}, {connection});
      console.log(connection.data);
      found = await data.findOne(modelA, {b}, {connection});
    });
    it('should find inserted document', () => {
      should(found).have.property('id');
      should(found).have.property('b').which.eql(b.id);
    });
  });
});
