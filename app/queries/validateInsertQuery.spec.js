/* globals describe it */
import should from 'should';
import * as data from '..';
import validateInsertQuery from './validateInsertQuery';

describe('Validate insert query', () => {
  it('should not fail', async () => {
    const model = data.model('foo', {foo: Number});
    await validateInsertQuery({foo: 1}, model);
  });
  it('should fail', async () => {
    const model = data.model('foo', {foo: Number});
    let err;
    try {
      await validateInsertQuery({foo: 'hello'}, model);
    } catch (error) {
      err = error;
    }
    should(err).be.an.Error();
  });
});
