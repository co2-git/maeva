/* globals describe it */
import should from 'should';

import * as data from '..';
import getType from '../types/getType';

describe('Arrays', () => {
  describe('Array syntax', () => {
    let type;
    it('should return a data type', () => {
      type = getType(Array.of(Number));
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
  describe('Type syntax', () => {
    let type;
    it('should return a data type', () => {
      type = getType(data.array(Number));
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
});
