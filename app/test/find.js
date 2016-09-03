import should from 'should';
import maeva, {Model} from '..';
import mock from '../lib/Mock';

class Foo extends Model {
  static schema = {
    f1: String,
    f2: Number,
  };
}

describe.only('Find', () => {
  before(async () => {
    await maeva.connect(mock());
  });
  describe('Unit', () => {
    it('should be a function', () => {
      should(Model.find).be.a.Function();
    });
  });
  describe('Find', () => {
    before(async () => {
      await Foo.create([
        {f1: 'a'},
        {f2: 1}
      ]);
    });
    it('should return 2 results', async () => {
      const found = await Foo.find();
      should(found).be.an.Array().and.have.length(2);
    });
  });
});
