import should from 'should';
import Model from '../lib/Model';
import validaters from '../test-utils/validaters';

function validateModel(type, value, bool) {
  describe(type, () => {
    it(`should${bool ? '' : ' not'} be a Model`, () => {
      if (bool) {
        should(Model.validate(value)).be.true();
      } else {
        should(Model.validate(value)).be.false();
      }
    });
  });
}

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Model,
]);

describe('Model type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateModel(...validater));
  });
});
