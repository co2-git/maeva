import should from 'should';
import maeva, {Model} from '..';
import MaevaError from '../lib/Error';

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
    field2: {
      type: Number,
      default: () => 42,
    },
  };
}

class Foo3 extends Model {
  static schema = {
    field: {
      type: Boolean,
      required: true,
    }
  };
}

describe('Create document', () => {
  before(async () => {
    await maeva.connect(maeva.test(), 'test1');
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
    });
    it('should be an object', () => {
      should(doc).be.an.Object();
    });
    it('should have the expected fields', () => {
      should(doc).have.property('field').which.eql('1');
    });
  });
  describe('Default values', () => {
    let doc;
    before(async () => {
      doc = await Foo2.create({});
    });
    it('should be an object', () => {
      should(doc).be.an.Object();
    });
    it('should have the expected fields', () => {
      should(doc).have.property('field').which.is.true();
      should(doc).have.property('field2').which.eql(42);
    });
  });
  describe('Ensure required', () => {
    it('should throw an error if missing required', async () => {
      let error;
      try {
        await Foo3.create({});
      } catch (err) {
        error = err;
      } finally {
        should(error).be.an.instanceOf(MaevaError);
        should(error).have.property('code')
          .which.eql(MaevaError.MISSING_REQUIRED_FIELD);
      }
    });
  });
});
