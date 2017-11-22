import 'babel-polyfill';
import should from 'should';
import _ from 'lodash';

import {insertOne, model} from '..';
import connection from '../test-util/connector';

describe('Insert One', () => {
  it('should only take registered fields', async () => {
    try {
      const inserted = await insertOne(
        model('foo', {foo: String}),
        {foo: 'hey', bar: 1},
        {connection}
      );
      should(_.keys(inserted)).eql(['foo', 'id']);
      should(inserted.foo).eql('hey');
      should(inserted.id).be.a.Number();
    } catch (error) {
      throw error;
    }
  });
});
