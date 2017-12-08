/* globals describe it */
import should from 'should';
import * as data from '..';
import formatInsertQuery from './formatInsertQuery';

describe('Format insert query', () => {
  it('should not change query if not needed - but convert', () => {
    const model = data.model('foo', {
      foo: String,
      bar: Number,
      link: data.link()
    });
    const query = {
      foo: 1,
      bar: '2',
      link: {name: 'hey', id: 22},
    };
    const formatted = formatInsertQuery(
      query,
      model,
      {connection: data.connections[0]}
    );
    const expected = {foo: '1', bar: 2, link: 22};
    should(formatted).eql(expected);
  });
});
