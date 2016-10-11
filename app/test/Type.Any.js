/* global describe it */
import should from 'should';
import Any from '../lib/Type/Any';
import validaters from '../test-utils/validators';

function validateAny(type, value, bool) {
  describe(type, () => {
    it(`should${bool ? '' : ' not'} be a Any`, () => {
      if (bool) {
        should(Any.validate(value)).be.true();
      } else {
        should(Any.validate(value)).be.false();
      }
    });
  });
}

function convertAny(type, value, expected) {
  describe(`Convert ${type} to Any`, () => {
    it('should be the expected value', () => {
      should(Any.convert(value)).be.eql(expected);
    });
  });
}

function setAny(type, value, expected) {
  describe(`Set ${type} to Any`, () => {
    it('should be the expected value', () => {
      should(Any.set(value)).be.eql(expected);
    });
  });
}

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Any[0],
]);

const arrayConverters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Any[1],
]);

const arraySetters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Any[2],
]);

describe('Any type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateAny(...validater));
  });
  describe('Convert', () => {
    arrayConverters.forEach((converter) => convertAny(...converter));
  });
  describe('Set', () => {
    arraySetters.forEach((setter) => setAny(...setter));
  });
});
