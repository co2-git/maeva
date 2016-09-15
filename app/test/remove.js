/* global describe it before */
import should from 'should';
import maeva, {Model} from '..';
import mock from '../lib/Mock';

class Foo extends Model {
  static schema = {field: Number};
}

describe('Remove', () => {
  before(async () => {
    await maeva.connect(mock());
    await Foo.create([
      {field: 1},
      {field: 2},
      {field: 3},
      {field: 4},
    ]);
  });
  describe('Unit', () => {
    it('should be a function', () => {
      should(Model.remove).be.a.Function();
    });
  });
  describe('Remove with query', () => {
    let removed;
    before(async () => {
      try {
        removed = await Foo.remove({field: 1});
      } catch (error) {
        console.log(error.stack);
      }
    });
    it('should return a list of 1 removed result', async () => {
      should(removed).be.eql(1);
    });
    it('should have removed document', async () => {
      const found = await Foo.findOne({field: 1});
      should(found).be.undefined();
    });
  });
  describe('Remove with no query', () => {
    let removed;
    before(async () => {
      try {
        removed = await Foo.remove();
      } catch (error) {
        console.log(error.stack);
      }
    });
    it('should return a list of 3 removed result', async () => {
      should(removed).be.eql(3);
    });
    it('should have removed document', async () => {
      const found = await Foo.find();
      should(found).have.length(0);
    });
  });
});
