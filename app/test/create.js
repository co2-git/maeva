import should from 'should';
import maeva, {Model} from '..';

class Foo1 extends Model {
  static schema = {
    field: String,
  };
}

class Foo2 extends Model {
  static schema = {
    field: {
      type: Boolean,
      default: true,
    },
  };
}

describe('Create document', () => {
  before(() => {
    maeva.connect(maeva.test());
  });
  describe('Valid insertion', () => {
    let doc;
    before(async () => {
      doc = await Foo1.create({field: 'a'});
    });
    it('should be an object', () => {
      should(doc).be.an.Object();
    });
    it('should have the expected fields', () => {
      should(doc).have.property('field').which.eql('a');
    });
  });
  describe('Converted values', () => {
    let doc;
    before(async () => {
      doc = await Foo1.create({field: 1});
      console.log({doc});
    });
    it('should be an object', () => {
      should(doc).be.an.Object();
    });
    it('should have the expected fields', () => {
      should(doc).have.property('field').which.eql('1');
    });
  });
});
