/* global describe it */
import should from 'should';
import Model from '../lib/Model';
import validaters from '../test-utils/validators';

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

function convertModel(type, value, expected) {
  describe(`Convert ${type} to Model`, () => {
    it('should be the expected value', () => {
      should(Model.convert(value)).be.eql(expected);
    });
  });
}

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Model[0],
]);

const arrayConverters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Model[1],
]);

describe('Model type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateModel(...validater));
  });
  describe('Convert', () => {
    arrayConverters.forEach((converter) => convertModel(...converter));
  });
});
