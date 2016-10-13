/* global describe it before */
import 'babel-polyfill';
import should from 'should';
import MaevaError from '../../lib/Error';

describe('Mungo Error', () => {
  describe('Unit', () => {
    it('should be a class', () => {
      should(MaevaError).be.a.Function();
    });
    it('has static function rethrow', () => {
      should(MaevaError).have.property('rethrow').which.is.a.Function();
    });
  });
  describe('New mungo error with only a message', () => {
    let error;
    before(() => {
      error = new MaevaError('Ouch');
    });
    it('should be an error', () => {
      should(error).be.an.instanceOf(Error);
    });
    it('should have empty options', () => {
      should(error).have.property('options').which.eql({});
    });
  });
  describe('New mungo error with options', () => {
    let error;
    before(() => {
      error = new MaevaError('Ouch', {foo: 1});
    });
    it('should be an error', () => {
      should(error).be.an.instanceOf(Error);
    });
    it('should have the message', () => {
      should(error).have.property('message');
    });
    it('should have options', () => {
      should(error).have.property('options').which.eql({foo: 1});
    });
  });
  describe('New mungo error with options and code', () => {
    let error;
    before(() => {
      error = new MaevaError('Ouch', {foo: 1, code: 2});
    });
    it('should be an error', () => {
      should(error).be.an.instanceOf(Error);
    });
    it('should have options', () => {
      should(error).have.property('options').which.eql({foo: 1});
    });
    it('should have code', () => {
      should(error).have.property('code').which.eql(2);
    });
  });
  describe('Rethrow', () => {
    let error;
    before(() => {
      const error1 = new MaevaError('Error #1', {number: 1});
      error = MaevaError.rethrow(error1, 'Error #2', {number: 2});
    });
    it('should be an error', () => {
      should(error).be.an.instanceOf(Error);
    });
    it('should have previous error', () => {
      should(error).have.property('previous')
        .which.is.an.instanceOf(MaevaError);
    });
  });
});
