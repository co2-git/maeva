/* global describe it */

import Model from '../lib/Model';
import Schema from '../lib/Schema';
import should from 'should';

class Bar extends Model {}

class Foo extends Model {
  static schema = {
    short: String,
    type: {type: Number},
    associate: Bar,
  };
}

describe('Model', () => {
  it('should be a class', () => {
    should(Model).be.a.Function();
  });
  describe('type', () => {
    it('should have a validator function', () => {
      should(Model).have.property('validate')
        .which.is.a.Function();
    });
  });
  describe('Schema', () => {
    it('should return a Schema', () => {
      const schema = Foo.getSchema();
      should(schema).be.an.instanceOf(Schema);
    });
  });
});
