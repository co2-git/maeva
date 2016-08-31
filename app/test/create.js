import should from 'should';
import maeva, {Model} from '..';

class Foo1 extends Model {
  static schema = {
    field: Boolean,
  };
}

describe.only('Create document', () => {
  before(() => {
    maeva.connect(maeva.test());
  });
  describe('Valid insertion', () => {
    let doc;
    before(async () => {
      doc = await Foo1.create({field: true});
    });
    it('should be an object', () => {
      should(doc).be.an.Object();
    });
  });
});
