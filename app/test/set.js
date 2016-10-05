/* global describe it before */
import should from 'should';
import set from '../lib/utils/set';
import Schema from '../lib/Schema';
import Model from '../lib/Model';

class Foo extends Model {
  static schema = {foo: String};
}

describe('Set', () => {
  let simpleSchema, embeddedSchema;
  before(() => {
    simpleSchema = new Schema({
      foo: String,
    });
    embeddedSchema = new Schema({
      foo: new Schema({bar: String}),
    });
  });
  describe('Stand alone function', () => {
    describe('Unit', () => {
      it('should be a function', () => {
        should(set).be.a.Function();
      });
    });
    describe('Regular native types', () => {
      it('should set straight types', () => {
        should(set('foo', 'hello', simpleSchema)).eql('hello');
      });
    });
    describe('Convert native types', () => {
      it('should convert types', () => {
        should(set('foo', 1, simpleSchema)).eql('1');
      });
    });
    describe('Embedded documents', () => {
      describe('Regular native types', () => {
        it('should set straight types', () => {
          should(set('foo', {bar: 'hello'}, embeddedSchema))
            .eql({bar: 'hello'});
        });
      });
      describe('Convert native types', () => {
        it('should convert types', () => {
          should(set('foo', 1, simpleSchema)).eql('1');
        });
      });
    });
  });
  describe('Model.set', () => {
    describe('Unit', () => {
      it('should be a function', () => {
        should(new Model().set).be.a.Function();
      });
      it('should return model', () => {
        should(new Foo().set('foo', 1)).be.an.instanceOf(Foo);
      });
    });
    describe('Set an Object', () => {
      let foo;
      before(() => {
        foo = new Foo().set({foo: 1});
      });
      it('should set Object', () => {
        should(foo).have.property('foo').which.eql('1');
      });
      it('should be a chainable instance of model', () => {
        should(foo).be.an.instanceOf(Foo);
      });
    });
  });
  describe('Set with meta queries', () => {
    describe('$not', () => {
      it('should set value', () => {
        const setter = set(
          'foo',
          {$not: 1},
          Foo.getSchema(),
        );
        should(setter).eql({$not: '1'});
      });
    });
  });
});
