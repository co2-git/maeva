/* global describe it */
import should from 'should';
import Field from '../lib/Field';
import {
  string,
  number,
} from '../test-utils/schema';
import {Type} from '..';

function verifyField(field, type, associatedType) {
  it('should have the right type', () => {
    should(field).have.property('type').which.eql(type);
  });
  it('should have the right associated type', () => {
    should(field).have.property('$type').which.eql(associatedType);
  });
}

describe('Field', () => {
  describe('Unit', () => {
    it('should be a function', () => {
      should(Field).be.a.Function();
    });
  });
  describe('Types', () => {
    describe('String', () => {
      verifyField(new Field(string), String, Type.String);
    });
    describe('Number', () => {
      verifyField(new Field(number), Number, Type.Number);
    });
  });
});
