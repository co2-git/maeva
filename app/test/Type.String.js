import should from 'should';
import _String from '../lib/Type/String';
import validaters from '../test-utils/validaters';

function validateString(type, value, bool) {
  describe(type, () => {
    it(`should${bool ? '' : ' not'} be a String`, () => {
      if (bool) {
        should(_String.validate(value)).be.true();
      } else {
        should(_String.validate(value)).be.false();
      }
    });
  });
}

function convertString(type, value, expected) {
  describe(`Convert ${type} to String`, () => {
    it('should be the expected value', () => {
      should(_String.convert(value)).be.eql(expected);
    });
  });
}

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].String[0],
]);

const arrayConverters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].String[1],
]);

describe('String type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateString(...validater));
  });
  describe('Convert', () => {
    arrayConverters.forEach((converter) => convertString(...converter));
  });
});
