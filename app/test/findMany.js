/* globals describe it before */
import * as data from '../';
import should from 'should';

const model = data.model('findMany', {foo: Number});

describe('Find many', () => {
  let found;
  before(async () => {
    await data.insertOne(model, {foo: 42});
    await data.insertOne(model, {foo: 43});
    await data.insertOne(model, {foo: 44});
    found = await data.findMany(model, {});
  });
  describe('Find without query', () => {
    it('should find inserted document', () => {
      should(found).be.an.Array().and.have.length(3);
      should(found[0]).have.property('foo').which.eql(42);
      should(found[1]).have.property('foo').which.eql(43);
      should(found[2]).have.property('foo').which.eql(44);
    });
  });
  // describe('Find with query', () => {
  //   before(async () => {
  //     found = await data.findOne(model, {foo: {below: 44}}, {connection});
  //   });
  //   it('should find inserted document', () => {
  //     should(found).be.an.Array().and.have.length(2);
  //     should(found[0]).have.property('foo').which.eql(42);
  //     should(found[1]).have.property('foo').which.eql(43);
  //   });
  // });
});
