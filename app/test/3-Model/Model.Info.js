/* global describe it */
import should from 'should';
import Model from '../../lib/Model';

class Info extends Model {
  static version = 4;
  static collectionName = 'foo';
  static schema = {foo: String};
}

describe('Model Info', () => {
  describe('Is Maeava Model', () => {
    it('should be a maeva model', () => {
      should(Model).have.property('isMaevaModel').which.is.true();
    });
  });
  describe('Default version', () => {
    it('should have a default version', () => {
      should(Model).have.property('version').which.eql(0);
    });
  });
  describe('Collection name', () => {
    it('should pluralize name by default', () => {
      should(Model._getCollectionName()).eql('models');
    });
    it('should use custom name if present', () => {
      should(Info._getCollectionName()).eql('foo');
    });
  });
  describe('Get info', () => {
    it('should display readable info', () => {
      const info = Info._getInfo();
      should(info).have.property('name').which.eql('Info');
      should(info).have.property('version').which.eql(4);
      should(info).have.property('collectionName').which.eql('foo');
      should(info).have.property('schema').which.eql({
        foo: {type: 'String'}
      });
    });
  });
});
