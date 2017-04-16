/* global describe it before after */
import should from 'should';
import ModelStatement from '../../lib/Model/extend/Statement';

describe('Model statement', () => {
  before(async () => {
    // ...
  });
  describe('Unit', () => {
    it('should have a find method', () => {
      should(ModelStatement).have.property('find').which.is.a.Function();
    });
    it('should have a findOne method', () => {
      should(ModelStatement).have.property('findOne').which.is.a.Function();
    });
    it('should have a findById method', () => {
      should(ModelStatement).have.property('findById').which.is.a.Function();
    });
    it.skip('should have a findRandom method', () => {
      should(ModelStatement).have.property('findRandom').which.is.a.Function();
    });
    it.skip('should have a findRandomOne method', () => {
      should(ModelStatement)
        .have.property('findRandomOne').which.is.a.Function();
    });
  });
  after(async () => {
     // ...
  });
});
