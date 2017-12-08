/* globals describe it */
import should from 'should';

import * as data from '..';
import getType from '../types/getType';

describe('Shapes', () => {
  describe('One level shapes', () => {
    let type;
    it('should return a data type', () => {
      type = getType(data.shape({bar: Number}));
      should(type).be.an.Object();
    });
    it('should have a converter', () => {
      should(type).have.property('convert').which.is.a.Function();
    });
    it('should convert shapes with exact types', async () => {
      const converted = await type.convert({bar: 2});
      should(converted).have.property('bar').which.eql(2);
    });
  });
});
