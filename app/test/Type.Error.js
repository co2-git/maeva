/* global describe it */
import should from 'should';
import _Error from '../lib/Type/Error';
import validaters from '../test-utils/validators';

function validateError(type, value, bool) {
  describe(type, () => {
    it(`should${bool ? '' : ' not'} be an Error`, () => {
      if (bool) {
        should(_Error.validate(value)).be.true();
      } else {
        should(_Error.validate(value)).be.false();
      }
    });
  });
}

function convertError(type, value, expected) {
  describe(`Convert ${type} to Error`, () => {
    it('should be the expected value', () => {
      should(_Error.convert(value)).be.eql(expected);
    });
  });
}

function setError(type, value, expected) {
  describe(`Set ${type} to Error`, () => {
    it('should be the expected value', () => {
      if (expected === 'throw') {
        should(() => _Error.set(value)).throw();
      } else {
        should(_Error.set(value)).be.eql(expected);
      }
    });
  });
}

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Error[0],
]);

const arrayConverters = validaters
  .filter(validator => validator[0] !== 'Error')
  .map(validater => [
    validater[0],
    validater[1],
    validater[2].Error[1],
  ]);

const arraySetters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Error[2],
]);

describe('Error type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateError(...validater));
  });
  describe('Convert', () => {
    arrayConverters.forEach((converter) => convertError(...converter));
  });
  describe('Set', () => {
    arraySetters.forEach((setter) => setError(...setter));
  });
});
