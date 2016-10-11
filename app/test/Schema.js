/* global describe it before */
import should from 'should';
import Schema from '../lib/Schema';
import Field from '../lib/Field';

describe('Schema', () => {
  describe('Short notation', () => {
    describe('Short notation with function', () => {
      let schema;
      before(() => {
        schema = new Schema({foo: String});
      });
      it('should display type', () => {
        should(schema).have.property('foo').which.is.an.Object();
        should(schema.foo).be.an.instanceof(Field);
        should(schema.foo).have.property('type').which.eql(String);
      });
    });
    describe('Short notation with instance of Schema', () => {
      let schema;
      before(() => {
        schema = new Schema({foo: new Schema({num: Number})});
      });
      it('should display type', () => {
        should(schema).have.property('foo').which.is.an.Object();
        should(schema.foo).be.an.instanceof(Field);
        should(schema.foo).have.property('type')
          .which.is.a.Function();
      });
    });
  });
  describe('Long notation', () => {
    let schema;
    before(() => {
      schema = new Schema({foo: {type: String}});
    });
    it('should display type', () => {
      should(schema).have.property('foo').which.is.an.Object();
      should(schema.foo).have.property('type').which.eql(String);
    });
  });
  describe('Embedded schema (short notation)', () => {
    let schema;
    before(() => {
      schema = new Schema({foo: new Schema({
        foo: String,
        bar: Number,
      })});
    });
    it('should display type', () => {
      should(schema).have.property('foo').which.is.an.Object();
      should(schema.foo).have.property('type').which.is.a.Function();
    });
  });
  describe('Embedded schema (long notation)', () => {
    let schema;
    before(() => {
      schema = new Schema({
        foo: {
          type: new Schema({
            foo: String,
            bar: Number,
          }),
          required: true,
        },
      });
    });
    it('should display type', () => {
      should(schema).have.property('foo').which.is.an.Object();
      should(schema.foo).have.property('type').which.is.a.Function();
      should(schema.foo).have.property('required').which.is.true();
    });
  });
});
