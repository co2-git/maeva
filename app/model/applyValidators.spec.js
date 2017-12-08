/* globals describe it */
import should from 'should';
import * as data from '..';
import applyValidators from './applyValidators';

describe('Apply validators', () => {
  describe('Insert', () => {
    describe('Validator functions', () => {
      const model = data.model(
        'foo',
        {foo: Number},
        {
          validate: {
            foo: number => number > 10
          }
        }
      );
      it('should fail if validator returns false', () => {
        let err;
        try {
          applyValidators({foo: 1}, model);
        } catch (error) {
          err = error;
        }
        should(err).be.an.Error();
      });
      it('should not fail if validator returns false', () => {
        applyValidators({foo: 11}, model);
      });
    });
    describe('Validator regular expressions', () => {
      const model = data.model(
        'foo',
        {foo: String},
        {
          validate: {
            foo: /^j/i
          }
        }
      );
      it('should fail if validator returns false', () => {
        let err;
        try {
          applyValidators({foo: 'mathew'}, model);
        } catch (error) {
          err = error;
        }
        should(err).be.an.Error();
      });
      it('should not fail if validator returns false', () => {
        applyValidators({foo: 'john'}, model);
      });
    });
  });
});
