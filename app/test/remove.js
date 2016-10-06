/* global describe it before after */
import should from 'should';
import maeva, {Model} from '..';
import simpledb, {db} from 'maeva-simpledb';
import uuid from 'uuid';

class Test extends Model {
  static schema = {field: Number};
  static collectionName = `test-${uuid.v4()}`;
}

describe('Remove', () => {
  before(async () => {
    await maeva.connect(simpledb());
    await Test.create([
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
  describe.skip('Remove with query', () => {
    let removed;
    before(async () => {
      try {
        removed = await Test.remove({field: 1});
      } catch (error) {
        console.log(error.stack);
      }
    });
    it('should return the number of removed results (1)', async () => {
      should(removed).be.eql(1);
    });
    it('should have removed document', async () => {
      const found = await Test.findOne({field: 1});
      should(found).be.undefined();
    });
  });
  describe.skip('Remove with no query', () => {
    let removed;
    before(async () => {
      try {
        removed = await Test.remove();
      } catch (error) {
        console.log(error.stack);
      }
    });
    it('should return a list of 3 removed result', async () => {
      should(removed).be.eql(3);
    });
    it('should have removed document', async () => {
      const found = await Test.find();
      should(found).have.length(0);
    });
  });
  after(() => {
    delete db.tests;
  });
});
