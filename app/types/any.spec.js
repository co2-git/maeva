/* globals describe it */
import should from 'should';

import * as data from '..';

describe('Any', () => {
  const type = data.any();
  it('should return a data type', () => {
    should(type).be.an.Object();
  });
  it('should have a converter', () => {
    should(type).have.property('convert').which.is.a.Function();
  });
  it('should convert everything', () => {
    const everything = [
      'hello',
      123,
      true,
      null,
    ];
    for (const value of everything) {
      should(type.convert(value)).eql(value);
    }
  });
  it('should have a validater', () => {
    should(type).have.property('validate').which.is.a.Function();
  });
  it('should validate everyhting', () => {
    const everything = [
      'hello',
      123,
      true,
      null,
    ];
    for (const value of everything) {
      type.validate(value);
    }
  });
});
