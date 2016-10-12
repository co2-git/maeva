/* global describe it */
import should from 'should';
import * as Type from '../lib/Type';

class Custom {
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

class FailCustom {}

describe('Associate types', () => {
  describe('Native types', () => {
    describe('Number', () => {
      it('should asssociate', () => {
        should(Type.associate(Number)).eql(Type.Number);
      });
    });
    describe('String', () => {
      it('should asssociate', () => {
        should(Type.associate(String)).eql(Type.String);
      });
    });
    describe('Boolean', () => {
      it('should asssociate', () => {
        should(Type.associate(Boolean)).eql(Type.Boolean);
      });
    });
    describe('Date', () => {
      it('should asssociate', () => {
        should(Type.associate(Date)).eql(Type.Date);
      });
    });
    describe('RegExp', () => {
      it('should asssociate', () => {
        should(Type.associate(RegExp)).eql(Type.RegExp);
      });
    });
    describe('Error', () => {
      it('should asssociate', () => {
        should(Type.associate(Error)).eql(Type.Error);
      });
    });
  });
  describe('Custom type', () => {
    it('should associate if it has validate/convert/set functions', () => {
      should(Type.associate(Custom)).eql(Custom);
    });
    it('should not associate if it does not have validate/convert/set functions'
    , () => {
      should(() => Type.associate(FailCustom)).throw();
    });
  });
});
