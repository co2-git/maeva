/* globals describe it */
import should from 'should';

import * as data from '..';
import getType from '../types/getType';

describe('Mixed', () => {
  let type;
  it('should return a data type', () => {
    type = getType(data.mixed(Number, String));
    should(type).be.an.Object();
  });
  it('should have a converter', () => {
    should(type).have.property('convert').which.is.a.Function();
  });
  it('should convert values', () => {
    should(type.convert(1)).eql(1);
  });
  it('should validate', () => {
    type.validate('hello');
    // type.validate(1);
  });
  it('should not validate non-numbers', () => {
    let err;
    try {
      type.validate(true);
    } catch (error) {
      err = error;
    }
    should(err).be.an.Error();
  });
});
