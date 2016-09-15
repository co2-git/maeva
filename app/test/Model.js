/* global describe it */

import Model from '../lib/Model';
import Schema from '../lib/Schema';
import should from 'should';

class Bar extends Model {
  static _collectionName = 'barz';
  static version = 14;
}

class Foo extends Model {
  static schema = {
    short: String,
    type: {type: Number},
    associate: Bar,
  };
}

describe.only('Model', () => {
  it('should be a class', () => {
    should(Model).be.a.Function();
  });
  describe('type', () => {
    it('should have a validator function', () => {
      should(Model).have.property('validate')
        .which.is.a.Function();
    });
    it('should have a converter function', () => {
      should(Model).have.property('convert')
        .which.is.a.Function();
    });
  });
  describe('Schema', () => {
    it('should return a Schema', () => {
      const schema = Foo.getSchema();
      should(schema).be.an.instanceOf(Schema);
    });
  });
  describe('Collection name', () => {
    it('should be a getCollectionName function', () => {
      should(Foo.getCollectionName).be.a.Function();
    });
    it('should return pluralized collection if no custom name present', () => {
      should(Foo.getCollectionName()).be.eql('foos');
    });
    it('should return custom collection name if present', () => {
      should(Bar.getCollectionName()).eql('barz');
    });
  });
  describe('Migration', () => {
    it('should have a default model version', () => {
      should(Foo).have.property('version').which.eql(0);
    });
    it('should have declared model version', () => {
      should(Bar).have.property('version').which.eql(14);
    });
  });
});
