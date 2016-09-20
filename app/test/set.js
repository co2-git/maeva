/* global describe it before */
import should from 'should';
import set from '../lib/Model/set';
import Schema from '../lib/Schema';

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
});
