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

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].String,
]);

describe('String type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateString(...validater));
  });
});
