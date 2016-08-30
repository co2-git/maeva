import should from 'should';
import _Number from '../lib/Type/Number';
import validaters from '../test-utils/validaters';

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

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Number,
]);

describe('Number type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateNumber(...validater));
  });
});
