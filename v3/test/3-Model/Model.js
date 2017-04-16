/* global describe it before */

import should from 'should';
import Model from '../../lib/Model';
import Schema from '../../lib/Schema';

class Test extends Model {
  static schema = {
    string: String,
    number: {
      type: Number,
      default: 0,
    },
    embed: new Schema({foo: Boolean}),
    embedDefault: new Schema({
      message: {
        type: String,
        default: 'hello',
      },
    }),
    numbers: [Number],
    required: {
      type: Date,
      required: false,
    },
    validateMe: {
      type: Number,
      validate: (num) => num > 10,
    },
  };
}

const original = {
  string: 1,
};

describe('Model', () => {
  let model;
  before(() => {
    model = new Test(original);
  });
  describe('Wild instantiate', () => {
    describe('Hidden properties', () => {
      it('should have schema', () => {
        should(model)
          .have.propertyWithDescriptor('$schema', {enumerable: false})
          .which.is.an.instanceOf(Schema);
      });
      it('should not have a connector', () => {
        should(model)
          .have.propertyWithDescriptor('$conn', {enumerable: false})
          .which.is.undefined();
      });
      it('should not be from DB', () => {
        should(model)
          .have.propertyWithDescriptor('$fromDB', {enumerable: false})
          .which.is.false();
      });
      it('should have original', () => {
        should(model)
          .have.propertyWithDescriptor('$original', {enumerable: false})
          .which.eql(original);
      });
      it('should have $changed', () => {
        should(model)
          .have.propertyWithDescriptor('$changed', {enumerable: false})
          .which.eql({
            string: '1'
          });
      });
      it('should have $old', () => {
        should(model)
          .have.propertyWithDescriptor('$old', {enumerable: false})
          .which.is.an.Object();
      });
    });
    describe('Document', () => {
      it('should have converted values', () => {
        should(model.string).eql('1');
      });
    });
    describe('Set', () => {
      it('should work with objects', () => {
        model.set({string: 2});
        should(model.string).eql('2');
      });
      it('should return self', () => {
        should(model.set({})).be.an.instanceOf(Model);
      });
      it('should set embedded documents', () => {
        model.set('embed.foo', true);
        should(model.embed).have.property('foo').which.is.true();
      });
    });
  });
  describe('Serialize', () => {
    it('should serialize', () => {
      should(model.toJSON()).eql({
        string: '2',
        embed: {foo: true},
      });
    });
  });
  describe('Apply default', () => {
    it('should have set default values', () => {
      model.applyDefault();
      should(model.number).eql(0);
      should(model.embedDefault.message).eql('hello');
    });
  });
  describe('Required', () => {
    it('should throw if required are missing', () => {
      Test.schema.required.required = true;
      should(() => model.ensureRequired()).throw();
    });
    it('should not throw if all required are present', () => {
      model.set('required', new Date());
      should(() => model.ensureRequired()).not.throw();
    });
  });
  describe('Validators', () => {
    it('should throw if validator fails', () => {
      model.set('validateMe', 5);
      should(() => model.runValidators()).throw();
    });
    it('should not throw if validator passes', () => {
      model.set('validateMe', 15);
      should(() => model.runValidators()).not.throw();
    });
  });
});
