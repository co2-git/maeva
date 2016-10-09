import should from 'should';
import _Number from '../lib/Type/Number';
import validaters from '../test-utils/validators';

function validateNumber(type, value, bool) {
  describe(type, () => {
    it(`should${bool ? '' : ' not'} be a Number`, () => {
      if (bool) {
        should(_Number.validate(value)).be.true();
      } else {
        should(_Number.validate(value)).be.false();
      }
    });
  });
}

function convertNumber(type, value, expected) {
  describe(`Convert ${type} to Number`, () => {
    it('should be the expected value', () => {
      should(_Number.convert(value)).be.eql(expected);
    });
  });
}

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Number[0],
]);

const arrayConverters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Number[1],
]);

describe('Number type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateNumber(...validater));
  });
  describe('Convert', () => {
    arrayConverters.forEach((converter) => convertNumber(...converter));
  });
});
