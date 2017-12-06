/* globals describe it */
import should from 'should';

import getType from '../types/getType';

describe('String', () => {
  let type;
  it('should return a data type', () => {
    type = getType(String);
    should(type).be.an.Object();
  });
  it('should have a converter', () => {
    should(type).have.property('convert').which.is.a.Function();
  });
  it('should convert strings', () => {
    should(type.convert('hello')).eql('hello');
  });
  it('should convert non-strings', () => {
    should(type.convert(1)).eql('1');
  });
  it('should have a validater', () => {
    should(type).have.property('validate').which.is.a.Function();
  });
  it('should validate strings', () => {
    type.validate('hello');
  });
  it('should not validate non-strings', () => {
    let err;
    try {
      type.validate(123);
    } catch (error) {
      err = error;
    }
    should(err).be.an.Error();
  });
});
