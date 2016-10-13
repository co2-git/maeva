/* global describe it */

import should from 'should';
import Statement from '../../lib/Statement';
import Model from '../../lib/Model';
import Schema from '../../lib/Schema';

class Foo extends Model {
  static schema = {
    string: String,
    embed: new Schema({number: Number}),
  };
}

describe.only('Get statement', () => {
  describe('Simple query', () => {
    it('should return statement with converted values', () => {
      const statement = Statement.get(
        {
          string: 1,
          embed: {number: '2'},
        },
        Foo._getSchema(),
      );
      should(statement).have.property('string').which.eql('1');
      should(statement)
        .have.property('embed')
        .which.have.property('number')
        .which.eql(2);
    });
  });
});
