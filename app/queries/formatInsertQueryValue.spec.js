/* globals describe it */
import should from 'should';
import formatInsertQueryValue from './formatInsertQueryValue';
import getType from '../types/getType';

describe('Format Insert Query Value', () => {
  describe('Primitive type', () => {
    it('should format value', () => {
      const formatted = formatInsertQueryValue(1, getType(String));
      const expected = '1';
      should(formatted).eql(expected);
    });
  });
});
