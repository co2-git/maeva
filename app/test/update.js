/* global describe it before after */
import should from 'should';
import maeva, {Model} from '..';

class Update extends Model {
  static schema = {field: Number};
}

const updates = [
  {field: 1},
  {field: 2},
  {field: 3},
  {field: 4},
];

describe.skip('Update', () => {
  before(async () => {
    await maeva.connect(simpledb());
    await Update.create(updates);
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
        updated = await Update.update({field: 1}, {field: 10});
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
        updated = await Update.update({}, {field: 10});
      } catch (error) {
        console.log(error.stack);
      }
    });
    it(`should return a list of ${updates.length} updated result`, async () => {
      should(updated).be.an.Array().and.have.length(updates.length);
      should(updated[0]).have.property('field').which.eql(10);
    });
    it('should have updated all resuls', () => {
      updated.forEach(doc => should(doc.field).eql(10));
    });
  });
  after(() => {
    delete db.updates;
  });
});
