/* global describe it before */
import should from 'should';
import Schema from '../lib/Schema';
import Field from '../lib/Field';
import * as Type from '../lib/Type';

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
  describe('Array', () => {
    describe('Array.of syntax', () => {
      describe('Short notation', () => {
        it('should convert to Type.Array', () => {
          const schema = new Schema({arrayOfStrings: Array.of(String)});
          should(schema.arrayOfStrings.type).be.a.Function();
        });
      });
      describe('Long notation', () => {
        it('should convert to Type.Array', () => {
          const schema = new Schema({arrayOfStrings: {
            type: Array.of(String),
          }});
          should(schema.arrayOfStrings.type).be.a.Function();
        });
      });
    });
    describe('Type.Array syntax', () => {
      describe('Short notation', () => {
        it('should convert to Type.Array', () => {
          const schema = new Schema({arrayOfStrings: Type.Array(String)});
          should(schema.arrayOfStrings.type).be.a.Function();
        });
      });
      describe('Long notation', () => {
        it('should convert to Type.Array', () => {
          const schema = new Schema({arrayOfStrings: {
            type: Type.Array(String),
          }});
          should(schema.arrayOfStrings.type).be.a.Function();
        });
      });
    });
    describe('[] syntax', () => {
      describe('Short notation', () => {
        it('should convert to Type.Array', () => {
          const schema = new Schema({arrayOfStrings: [String]});
          should(schema.arrayOfStrings.type).be.a.Function();
        });
      });
      describe('Long notation', () => {
        it('should convert to Type.Array', () => {
          const schema = new Schema({arrayOfStrings: {
            type: [String],
          }});
          should(schema.arrayOfStrings.type).be.a.Function();
        });
      });
    });
  });
});
