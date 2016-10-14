/* global describe it before after */
import should from 'should';
import ModelStatement from '../../lib/Model/extend/Statement';

describe('Model statement', () => {
  before(async () => {
    // ...
  });
  describe('Unit', () => {
    it('should have a connect method', () => {
      should(ModelStatement).have.property('connect').which.is.a.Function();
    });
    it('should have a find method', () => {
      should(ModelStatement).have.property('find').which.is.a.Function();
    });
  });
  after(async () => {
     // ...
  });
});
