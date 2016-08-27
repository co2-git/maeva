/* global describe it */

import Model from '../lib/Model';
import Schema from '../lib/Schema';
import should from 'should';

class Foo extends Model {
  static short = String;
  static type = {type: Number};
}

describe('Model', () => {
  it('should be a class', () => {
    should(Model).be.a.Function();
  });
  describe('Schema', () => {
    it('should return a Schema', () => {
      const schema = Foo.getSchema();
      should(schema).be.an.instanceOf(Schema);
    });
  });
});
