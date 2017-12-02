/* globals describe it before */
import * as data from '../';
import should from 'should';

const model = data.model('findOne', {foo: Number});
const modelB = data.model('modelB', {name: String});
const modelA = data.model('modelA', {name: String, b: data.link(modelB)});

describe('Find One', () => {
  let found;
  before(async () => {
    await data.insertOne(model, {foo: 42});
    found = await data.findOne(model, {});
  });
  describe('Find without query', () => {
    it('should find inserted document', () => {
      should(found).have.property(data.getId().name).which.eql(0);
      should(found).have.property('foo').which.eql(42);
    });
  });
  describe('Find with query', () => {
    before(async () => {
      await data.insertOne(model, {foo: 100});
      await data.insertOne(model, {foo: 1000});
      found = await data.findOne(model, {foo: 100});
    });
    it('should find inserted document', () => {
      should(found).have.property(data.getId().name);
      should(found).have.property('foo').which.eql(100);
    });
  });
  describe('Find with link', () => {
    let b;
    before(async () => {
      b = await data.insertOne(modelB, {name: 'B'});
      await data.insertOne(modelA, {name: 'A', b});
      found = await data.findOne(modelA, {b});
    });
    it('should find inserted document', () => {
      should(found).have.property(data.getId().name);
      should(found).have.property('b').which.eql(b.id);
    });
  });
  describe('Find by id (full document)', () => {
    let inserted;
    let _found;
    before(async () => {
      inserted = await data.insertOne(model, {foo: 1981});
      _found = await data.findById(model, inserted);
    });
    it('should find inserted document', () => {
      should(_found.id).eql(inserted.id);
    });
  });
});
