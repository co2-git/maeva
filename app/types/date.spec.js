/* globals describe it */
import should from 'should';

import getType from '../types/getType';

describe('Date', () => {
  let type;
  it('should return a data type', () => {
    type = getType(Date);
    should(type).be.an.Object();
  });
  it('should have a converter', () => {
    should(type).have.property('convert').which.is.a.Function();
  });
  it('should convert dates', () => {
    const date = new Date();
    should(type.convert(date)).eql(date);
  });
  it('should convert timestamps', () => {
    const date = new Date();
    should(type.convert(date.getTime())).eql(date);
  });
  it('should have a validater', () => {
    should(type).have.property('validate').which.is.a.Function();
  });
  it('should validate dates', () => {
    type.validate(new Date());
  });
  it('should not validate timestamps', () => {
    let err;
    try {
      type.validate(Date.now());
    } catch (error) {
      err = error;
    }
    should(err).be.an.Error();
  });
});
