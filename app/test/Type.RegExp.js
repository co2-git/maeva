/* global describe it */
import should from 'should';
import _RegExp from '../lib/Type/RegExp';
import validaters from '../test-utils/validators';

function validateRegExp(type, value, bool) {
  describe(type, () => {
    it(`should${bool ? '' : ' not'} be an RegExp`, () => {
      if (bool) {
        should(_RegExp.validate(value)).be.true();
      } else {
        should(_RegExp.validate(value)).be.false();
      }
    });
  });
}

function convertRegExp(type, value, expected) {
  describe(`Convert ${type} to RegExp`, () => {
    it('should be the expected value', () => {
      should(_RegExp.convert(value)).be.eql(expected);
    });
  });
}

function setRegExp(type, value, expected) {
  describe(`Set ${type} to RegExp`, () => {
    it('should be the expected value', () => {
      if (expected === 'throw') {
        should(() => _RegExp.set(value)).throw();
      } else {
        should(_RegExp.set(value)).be.eql(expected);
      }
    });
  });
}

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].RegExp[0],
]);

const arrayConverters = validaters
  .filter(validator => validator[0] !== 'RegExp')
  .map(validater => [
    validater[0],
    validater[1],
    validater[2].RegExp[1],
  ]);

const arraySetters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].RegExp[2],
]);

describe('RegExp type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateRegExp(...validater));
  });
  describe('Convert', () => {
    arrayConverters.forEach((converter) => convertRegExp(...converter));
  });
  describe('Set', () => {
    arraySetters.forEach((setter) => setRegExp(...setter));
  });
});
