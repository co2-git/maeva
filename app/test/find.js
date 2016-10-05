/* global describe it before after */
import should from 'should';
import maeva, {
  Model,
  // Schema,
} from '..';
import mock, {db} from '../lib/Mock';

class Find1 extends Model {
  static schema = {
    string: String,
    number: Number,
  };
}

class Find2 extends Model {
  static schema = {
    number: Number,
    find1: Find1,
    // deep: new Schema({
    //   foo: Foo3,
    // }),
    // nested: [Foo4],
  };
}

// class Foo3 extends Model {
//   static schema = {
//     field: String,
//   };
// }
//
// class Foo4 extends Model {
//   static schema = {
//     field: String,
//   };
// }

describe('Find', () => {
  let find1;
  // let foo3;
  // let foo4;
  before(async () => {
    await maeva.connect(mock());
    find1 = await Find1.create({
      string: 'a',
      number: 1,
    });
    await Find1.create([
      {number: 2},
      {number: 3},
    ]);
    // foo3 = await Foo3.create([
    //   {field: 'f3'},
    // ]);
    // foo4 = await Foo4.create([
    //   {field: 'f4'},
    // ]);
    await Find2.create({
      number: 1,
      find1,
      // deep: {
      //   foo: foo3,
      // },
      // nested: [foo4],
    });
  });
  describe('Unit', () => {
    it('should be a function', () => {
      should(Model.find).be.a.Function();
    });
  });
  describe('Find', () => {
    it('should return all results', async () => {
      const found = await Find1.find();
      should(found).be.an.Array().and.have.length(3);
    });
  });
  describe('Populate', () => {
    let found;
    before(async () => {
      found = await Find2.findOne({}, {populate: true});
    });
    it('should have populate fields', () => {
      should(found).have.property('find1').which.eql(find1);
    });
  });
  after(() => {
    delete db.foos;
  });
});
