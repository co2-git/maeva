import should from 'should';
import maeva, {Model} from '..';
import mock from '../lib/Mock';

class Foo extends Model {
  static schema = {f: Number};
}

describe.only('Update', () => {
  before(async () => {
    await maeva.connect(mock());
    await Foo.create([
      {f: 1},
      {f: 2},
      {f: 3},
      {f: 4},
    ]);
  });
  describe('Unit', () => {
    it('should be a function', () => {
      should(Model.find).be.a.Function();
    });
  });
  describe('Update', () => {
    let updated;
    before(async () => {
      try {
        updated = await Foo.update({f: 1}, {f: 10});
      } catch (error) {
        console.log(error.stack);
      }
    });
    it('should return a list of 1 updated result', async () => {
      should(updated).be.an.Array().and.have.length(1);
      should(updated[0]).have.property('f').which.eql(10);
    });
  });
});
