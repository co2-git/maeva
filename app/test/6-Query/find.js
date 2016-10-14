/* global describe it before after */
import should from 'should';
import Model from '../../lib/Model';

class TestFind extends Model {
  static schema = {
    string: String,
  };
}

describe.skip('Find query', () => {
  before(async () => {
    // ...
  });
  describe('Find', () => {
    it('should be something', () => {
       // ...
    });
  });
  after(async () => {
     // ...
  });
});
