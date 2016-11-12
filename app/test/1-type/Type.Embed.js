/* global describe it */
import should from 'should';
import embed from '../../lib/Type/Embed';
import Schema from '../../lib/Schema';
import validaters from '../../test-utils/validators';

const embedded = embed(new Schema({number: Number}));

function validateEmbed(type, value, bool) {
  describe(type, () => {
    it(`should${bool ? '' : ' not'} be a Embed`, () => {
      if (bool) {
        should(embedded.validate(value)).be.true();
      } else {
        should(embedded.validate(value)).be.false();
      }
    });
  });
}

function convertEmbed(type, value, expected) {
  describe(`Convert ${type} to Embed`, () => {
    it('should be the expected value', () => {
      should(embedded.convert(value)).be.eql(expected);
    });
  });
}

function setEmbed(type, value, expected) {
  describe(`Set ${type} to Embed`, () => {
    it('should be the expected value', () => {
      if (expected === 'throw') {
        should(() => embedded.set(value)).throw();
      } else {
        should(embedded.set(value)).be.eql(expected);
      }
    });
  });
}

const arrayValidaters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Embed[0],
]);

const arrayConverters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Embed[1],
]);

const arraySetters = validaters.map(validater => [
  validater[0],
  validater[1],
  validater[2].Embed[2],
]);

describe('Embed type', () => {
  // describe('Validate', () => {
  //   arrayValidaters.forEach((validater) => validateEmbed(...validater));
  // });
  // describe('Convert', () => {
  //   arrayConverters.forEach((converter) => convertEmbed(...converter));
  // });
  // describe('Set', () => {
  //   arraySetters.forEach((setter) => setEmbed(...setter));
  // });
});
