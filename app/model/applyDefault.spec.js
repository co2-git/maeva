/* globals describe it */
import should from 'should';
import * as data from '..';
import applyDefault from './applyDefault';

describe('Apply default', () => {
  describe('Insert', () => {
    it('should return fields if no default', () => {
      const model = data.model('foo', {foo: Number, bar: Number});
      const picked = applyDefault({foo: 1}, model, 'insert');
      const expected = {foo: 1};
      should(picked).eql(expected);
    });
    it('should applied default if missing', () => {
      const model = data.model(
        'foo',
        {foo: Number, bar: Number},
        {default: {bar: 42}}
      );
      const picked = applyDefault({foo: 1}, model, 'insert');
      const expected = {foo: 1, bar: 42};
      should(picked).eql(expected);
    });
    it('should not applied default if not missing', () => {
      const model = data.model(
        'foo',
        {foo: Number, bar: Number},
        {default: {bar: 42}}
      );
      const picked = applyDefault({foo: 1, bar: 0}, model, 'insert');
      const expected = {foo: 1, bar: 0};
      should(picked).eql(expected);
    });
  });
});
