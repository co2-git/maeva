/* globals describe it */
import should from 'should';
import * as data from '..';
import pickFields from './pickFields';

describe('Format pre insert document', () => {
  describe('Insert', () => {
    it('should pick all the fields from model', () => {
      const model = data.model('foo', {foo: Number, bar: Number});
      const picked = pickFields({foo: 1, bar: 1}, model, 'insert');
      const expected = {foo: 1, bar: 1};
      should(picked).eql(expected);
    });
    it('should exclude all the fields not from model', () => {
      const model = data.model('foo', {foo: Number, bar: Number});
      const picked = pickFields({foo: 1, bar: 1, barz: 1}, model, 'insert');
      const expected = {foo: 1, bar: 1};
      should(picked).eql(expected);
    });
  });
});
