/* global describe it */
import should from 'should';
import _ from 'lodash';
import arrayOf from '../../lib/Type/Array';
import validaters from '../../test-utils/validators';

const array = arrayOf(Number);

function validateArray(type, value, bool) {
  describe(type, () => {
    it(`should${bool ? '' : ' not'} be a Array`, () => {
      if (bool) {
        should(array.validate(value)).be.true();
      } else {
        should(array.validate(value)).be.false();
      }
    });
  });
}

function convertArray(type, value, expected) {
  describe(`Convert ${type} to Array`, () => {
    it('should be the expected value', () => {
      should(array.convert(value)).be.eql(expected);
    });
  });
}

function setArray(type, value, expected) {
  describe(`Set ${type} to Array`, () => {
    it('should be the expected value', () => {
      if (expected === 'throw') {
        should(() => array.set(value)).throw();
      } else {
        should(array.set(value)).be.eql(expected);
      }
    });
  });
}

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Array[0],
]);

const arrayConverters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Array[1],
]);

const arraySetters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Array[2],
]);

describe('Array type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateArray(...validater));
  });
  describe('Convert', () => {
    arrayConverters.forEach((converter) => convertArray(...converter));
  });
  describe('Set', () => {
    arraySetters.forEach((setter) => setArray(...setter));
  });
});
