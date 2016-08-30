import should from 'should';
import _Date from '../lib/Type/Date';
import validaters from '../test-utils/validaters';

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

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Date,
]);

describe('Date type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateDate(...validater));
  });
});
