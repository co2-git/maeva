/* global describe it */
import should from 'should';
import tupleOf from '../../lib/Type/Tuple';
import validaters from '../../test-utils/validators';

const tuple = tupleOf(String, Number);

function validateTuple(type, value, bool) {
  describe(type, () => {
    it(`should${bool ? '' : ' not'} be a Tuple`, () => {
      if (bool) {
        should(tuple.validate(value)).be.true();
      } else {
        should(tuple.validate(value)).be.false();
      }
    });
  });
}

function convertTuple(type, value, expected) {
  describe(`Convert ${type} to Tuple`, () => {
    it('should be the expected value', () => {
      should(tuple.convert(value)).be.eql(expected);
    });
  });
}

function setTuple(type, value, expected) {
  describe(`Set ${type} to Tuple`, () => {
    it('should be the expected value', () => {
      if (expected === 'throw') {
        should(() => tuple.set(value)).throw();
      } else {
        should(tuple.set(value)).be.eql(expected);
      }
    });
  });
}

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Tuple[0],
]);

const arrayConverters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Tuple[1],
]);

const arraySetters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Tuple[2],
]);

describe('Tuple type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateTuple(...validater));
  });
  describe('Convert', () => {
    arrayConverters.forEach((converter) => convertTuple(...converter));
  });
  describe('Set', () => {
    arraySetters.forEach((setter) => setTuple(...setter));
  });
});
