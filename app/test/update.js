/* global describe it before */
import should from 'should';
import maeva, {Model} from '..';
import mock from '../lib/Mock';

class Foo extends Model {
  static schema = {field: Number};
}

describe('Update', () => {
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
      should(Model.find).be.a.Function();
    });
  });
  describe('Update with query', () => {
    let updated;
    before(async () => {
      try {
        updated = await Foo.update({field: 1}, {field: 10});
      } catch (error) {
        console.log(error.stack);
      }
    });
    it('should return a list of 1 updated result', async () => {
      should(updated).be.an.Array().and.have.length(1);
      should(updated[0]).have.property('field').which.eql(10);
    });
  });
  describe('Update with no query', () => {
    let updated;
    before(async () => {
      try {
        updated = await Foo.update({}, {field: 10});
      } catch (error) {
        console.log(error.stack);
      }
    });
    it('should return a list of 1 updated result', async () => {
      should(updated).be.an.Array().and.have.length(1);
      should(updated[0]).have.property('field').which.eql(10);
    });
  });
});
