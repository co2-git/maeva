/* global describe it before */
import should from 'should';
import MungoError from '../lib/Error';

describe('Mungo Error', () => {
  describe('Unit', () => {
    it('should be a class', () => {
      should(MungoError).be.a.Function();
    });
    it('has static function rethrow', () => {
      should(MungoError).have.property('rethrow').which.is.a.Function();
    });
  });
  describe('New mungo error with only a message', () => {
    let error;
    before(() => {
      error = new MungoError('Ouch');
    });
    it('should be an error', () => {
      should(error).be.an.instanceOf(Error);
    });
    it('should have the right original message', () => {
      should(error).have.property('originalMessage').which.eql('Ouch');
    });
    it('should have empty options', () => {
      should(error).have.property('options').which.eql({});
    });
    it('should have a serialized message', () => {
      should(error).have.property('message')
        .which.eql(JSON.stringify({
          message: 'Ouch',
          options: {},
        }, null, 2));
    });
  });
  describe('New mungo error with options', () => {
    let error;
    before(() => {
      error = new MungoError('Ouch', {foo: 1});
    });
    it('should be an error', () => {
      should(error).be.an.instanceOf(Error);
    });
    it('should have the right original message', () => {
      should(error).have.property('originalMessage').which.eql('Ouch');
    });
    it('should have a serialized message', () => {
      should(error).have.property('message')
        .which.eql(JSON.stringify({
          message: 'Ouch',
          options: {foo: 1},
        }, null, 2));
    });
    it('should have options', () => {
      should(error).have.property('options').which.eql({foo: 1});
    });
  });
  describe('New mungo error with options and code', () => {
    let error;
    before(() => {
      error = new MungoError('Ouch', {foo: 1, code: 2});
    });
    it('should be an error', () => {
      should(error).be.an.instanceOf(Error);
    });
    it('should have the right original message', () => {
      should(error).have.property('originalMessage').which.eql('Ouch');
    });
    it('should have a serialized message', () => {
      should(error).have.property('message')
        .which.eql(JSON.stringify({
          message: 'Ouch',
          options: {foo: 1, code: 2},
        }, null, 2));
    });
    it('should have options', () => {
      should(error).have.property('options').which.eql({foo: 1, code: 2});
    });
    it('should have code', () => {
      should(error).have.property('code').which.eql(2);
    });
  });
});
