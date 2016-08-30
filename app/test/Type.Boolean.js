import should from 'should';
import _Boolean from '../lib/Type/Boolean';
import validaters from '../test-utils/validaters';

function validateBoolean(type, value, bool) {
  describe(type, () => {
    it(`should${bool ? '' : ' not'} be a boolean`, () => {
      if (bool) {
        should(_Boolean.validate(value)).be.true();
      } else {
        should(_Boolean.validate(value)).be.false();
      }
    });
  });
}

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Boolean,
]);

describe('Boolean type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateBoolean(...validater));
  });
});
