/* global describe it before after */
import should from 'should';
import maeva, {Model, Schema} from '..';
import mock, {db} from '../lib/Mock';

class Foo extends Model {
  static schema = {
    field: String,
    anotherField: Number,
  };
}

class Foo3 extends Model {
  static schema = {
    field: String,
  };
}

class Foo4 extends Model {
  static schema = {
    field: String,
  };
}

class Foo2 extends Model {
  static schema = {
    foo: Foo,
    // deep: new Schema({
    //   foo: Foo3,
    // }),
    // nested: [Foo4],
  };
}

describe('Find', () => {
  let foo1, foo2, foo3, foo4;
  before(async () => {
    await maeva.connect(mock());
    foo1 = await Foo.create([
      {field: 'f1'},
      {anotherField: 1}
    ]);
    foo3 = await Foo3.create([
      {field: 'f3'},
    ]);
    foo4 = await Foo4.create([
      {field: 'f4'},
    ]);
    foo2 = await Foo2.create({
      foo: foo1,
      deep: {
        foo: foo3,
      },
      nested: [foo4],
    });
  });
  describe('Unit', () => {
    it('should be a function', () => {
      should(Model.find).be.a.Function();
    });
  });
  describe('Find', () => {
    it('should return 2 results', async () => {
      const found = await Foo.find();
      should(found).be.an.Array().and.have.length(2);
    });
  });
  describe('Populate', () => {
    let found;
    before(async () => {
      found = await Foo2.find({}, {populate: true});
      console.log({found});
    });
    it('should have populate fields', () => {
      // ...
    });
  });
  after(() => {
    delete db.foos;
  });
});
