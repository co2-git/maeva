/* global describe it before */
import should from 'should';
import Schema from '../../lib/Schema';
import Field from '../../lib/Field';
import Model from '../../lib/Model';
import {Embed as embed} from '../../lib/Type';

class Test extends Model {}

class Link extends Model { }

describe('Model Schema', () => {
  before(() => {
    Test.schema = {
      foo: Number,
      embed: embed({foo: String}),
      link: Link,
      required: {
        type: Number,
        required: true,
      },
      _default: {
        type: Number,
        default: 42,
      },
      validator: {
        type: Number,
        validate: (number) => number > 100,
      },
    };
  });
  describe('Get schema', () => {
    it('should return a Schema', () => {
      should(Test._getSchema()).be.an.instanceOf(Schema);
    });
  });
  describe('Print Schema', () => {
    it('should return a JSON version of schema', () => {
      const toJSON = Test._printSchema();
      should(toJSON).be.an.Object();
    });
  });
  describe('Get schema links', () => {
    it('should return links', () => {
      const links = Test._getLinks();
      should(links).have.property('link')
        .which.have.property('isMaevaModel')
        .which.is.true();
    });
  });
  describe('Get required fields', () => {
    it('should return required fields', () => {
      const required = Test._getRequired();
      should(required).have.property('required')
        .which.is.an.instanceOf(Field);
    });
  });
  describe('Get default fields', () => {
    it('should return default fields', () => {
      const _default = Test._getDefault();
      should(_default).have.property('_default')
        .which.is.an.instanceOf(Field);
    });
  });
  describe('Get fields with validator', () => {
    it('should return fields with validator', () => {
      const validators = Test._getValidators();
      should(validators).have.property('validator')
        .which.is.an.instanceOf(Field);
    });
  });
  describe('Get embedded fields', () => {
    it('should return embedded fields', () => {
      const embedded = Test._getEmbedded();
      should(embedded).have.property('embed')
        .which.is.an.instanceOf(Field);
    });
  });
});
