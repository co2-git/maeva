/* globals describe it */
import should from 'should';

import * as data from '..';
import getType from '../types/getType';

describe('Tuples', () => {
  describe('Single type tuple', () => {
    let type;
    it('should return a data type', () => {
      type = getType(data.tuple(Number));
      should(type).be.an.Object();
    });
    it('should have a converter', () => {
      should(type).have.property('convert').which.is.a.Function();
    });
    it('should convert numbers', () => {
      should(type.convert([1])).eql([1]);
    });
    it('should convert non-numbers', () => {
      should(type.convert(['1'])).eql([1]);
    });
    it('should have a validater', () => {
      should(type).have.property('validate').which.is.a.Function();
    });
    it('should validate numbers', () => {
      type.validate([1]);
    });
    it('should not validate non-numbers', () => {
      let err;
      try {
        type.validate(['hello']);
      } catch (error) {
        err = error;
      }
      should(err).be.an.Error();
    });
  });
  describe('Multi type tuple', () => {
    let type;
    it('should return a data type', () => {
      type = getType(data.tuple(Number, String));
      should(type).be.an.Object();
    });
    it('should have a converter', () => {
      should(type).have.property('convert').which.is.a.Function();
    });
    it('should convert accepted values', () => {
      should(type.convert([1, '1'])).eql([1, '1']);
    });
    it('should convert non-accepted values', () => {
      should(type.convert(['1', 1])).eql([1, '1']);
    });
    it('should have a validater', () => {
      should(type).have.property('validate').which.is.a.Function();
    });
    it('should validate accepted values', () => {
      type.validate([1, 'hello']);
    });
    it('should not validate non-accepted values', () => {
      let err;
      try {
        type.validate(['hello', true]);
      } catch (error) {
        err = error;
      }
      should(err).be.an.Error();
    });
  });
});
