/* globals describe it */
import should from 'should';

import getType from '../types/getType';

describe('Boolean', () => {
  let type;
  it('should return a data type', () => {
    type = getType(Boolean);
    should(type).be.an.Object();
  });
  it('should have a converter', () => {
    should(type).have.property('convert').which.is.a.Function();
  });
  it('should convert booleans', () => {
    should(type.convert(true)).eql(true);
  });
  it('should convert non-booleans', () => {
    should(type.convert('1')).eql(true);
  });
  it('should have a validater', () => {
    should(type).have.property('validate').which.is.a.Function();
  });
  it('should validate booleans', () => {
    type.validate(true);
  });
  it('should not validate non-booleans', () => {
    let err;
    try {
      type.validate('hello');
    } catch (error) {
      err = error;
    }
    should(err).be.an.Error();
  });
});
