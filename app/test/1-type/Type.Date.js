/* global describe it */
import should from 'should';
import _Date from '../../lib/Type/Date';
import validaters from '../../test-utils/validators';

function validateDate(type, value, bool) {
  describe(type, () => {
    it(`should${bool ? '' : ' not'} be a Date`, () => {
      if (bool) {
        should(_Date.validate(value)).be.true();
      } else {
        should(_Date.validate(value)).be.false();
      }
    });
  });
}

function convertDate(type, value, expected) {
  describe(`Convert ${type} to Date`, () => {
    it('should be the expected value', () => {
      should(_Date.convert(value)).be.eql(expected);
    });
  });
}

function setDate(type, value, expected) {
  describe(`Set ${type} to Date`, () => {
    it('should be the expected value', () => {
      if (expected === 'throw') {
        should(() => _Date.set(value)).throw();
      } else {
        should(_Date.set(value)).be.eql(expected);
      }
    });
  });
}

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Date[0],
]);

const arrayConverters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Date[1],
]);

const arraySetters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Date[2],
]);

describe('Date type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateDate(...validater));
  });
  describe('Convert', () => {
    arrayConverters.forEach((converter) => convertDate(...converter));
  });
  describe('Set', () => {
    arraySetters.forEach((setter) => setDate(...setter));
  });
});
