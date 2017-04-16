/* global describe it */
import should from 'should';
import _Boolean from '../../lib/Type/Boolean';
import validaters from '../../test-utils/validators';

function validateBoolean(type, value, bool) {
  describe(type, () => {
    it(`should${bool ? '' : ' not'} be a Boolean`, () => {
      if (bool) {
        should(_Boolean.validate(value)).be.true();
      } else {
        should(_Boolean.validate(value)).be.false();
      }
    });
  });
}

function convertBoolean(type, value, expected) {
  describe(`Convert ${type} to Boolean`, () => {
    it('should be the expected value', () => {
      should(_Boolean.convert(value)).be.eql(expected);
    });
  });
}

function setBoolean(type, value, expected) {
  describe(`Set ${type} to Boolean`, () => {
    it('should be the expected value', () => {
      should(_Boolean.set(value)).be.eql(expected);
    });
  });
}

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Boolean[0],
]);

const arrayConverters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Boolean[1],
]);

const arraySetters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Boolean[2],
]);

describe('Boolean type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateBoolean(...validater));
  });
  describe('Convert', () => {
    arrayConverters.forEach((converter) => convertBoolean(...converter));
  });
  describe('Set', () => {
    arraySetters.forEach((setter) => setBoolean(...setter));
  });
});
