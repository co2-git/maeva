/* global describe it */
import should from 'should';
import _ from 'lodash';
import embed from '../lib/Type/Embed';
import Schema from '../lib/Schema';
import validaters from '../test-utils/validators';

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

describe('Embed type', () => {
  describe('Validate', () => {
    arrayValidaters.forEach((validater) => validateEmbed(...validater));
  });
  describe('Convert', () => {
    arrayConverters.forEach((converter) => convertEmbed(...converter));
  });
});
