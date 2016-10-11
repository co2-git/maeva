/* global describe it */
import should from 'should';
import _ from 'lodash';
import mixedTypes from '../lib/Type/Mixed';
import validaters from '../test-utils/validators';

class Email {
  static validate(value) {
    return _.isString(value) && /^.+@.+\..+$/.test(value);
  }
  static convert(value) {
    return value;
  }
}

class URL {
  static validate(value) {
    return _.isString(value) && /^https?:\/\/.+$/.test(value);
  }
  static convert(value) {
    return value;
  }
}

const mixed = mixedTypes(Email, URL);

function validateMixed(type, value, bool) {
  describe(type, () => {
    it(`should${bool ? '' : ' not'} be a Mixed`, () => {
      if (bool) {
        should(mixed.validate(value)).be.true();
      } else {
        should(mixed.validate(value)).be.false();
      }
    });
  });
}

function convertMixed(type, value, expected) {
  describe(`Convert ${type} to Mixed`, () => {
    it('should be the expected value', () => {
      should(mixed.convert(value)).be.eql(expected);
    });
  });
}

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Mixed[0],
]);

const arrayConverters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Mixed[1],
]);

describe('Mixed type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateMixed(...validater));
  });
  describe('Convert', () => {
    arrayConverters.forEach((converter) => convertMixed(...converter));
  });
});
