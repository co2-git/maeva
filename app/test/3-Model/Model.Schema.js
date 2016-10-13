/* global describe it before */
import should from 'should';
import Schema from '../../lib/Schema';
import {Embed as embed} from '../../lib/Type';
import ModelSchema from '../../lib/Model/extend/Schema';

class Model {
  static isMaevaModel = true;
  static validate() {
    return true;
  }
  static convert() {
    return true;
  }
  static set() {
    return true;
  }
}

class Test extends ModelSchema { }

describe('Model Schema', () => {
  before(() => {
    Test.schema = {
      foo: Number,
      embed: embed({foo: String}),
      join: Model,
    };
  });
  describe('Get schema', () => {
    it('should return a Schema', () => {
      should(Test.getSchema()).be.an.instanceOf(Schema);
    });
  });
  describe('Print Schema', () => {
    it('should return a JSON version of schema', () => {
      const toJSON = Test.printSchema();
      should(toJSON).be.an.Object();
    });
  });
});
