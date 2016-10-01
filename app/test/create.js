/* global describe it before after */
import should from 'should';
import maeva, {Model} from '..';
import mock from '../lib/mock';
import MaevaError from '../lib/Error';
import Schema from '../lib/Schema';

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

class Foo4 extends Model {
  static schema = {
    field: new Schema({
      foo: String,
    }),
  };
}

class Foo5 extends Model {
  static schema = {
    field: new Schema({
      foo: {
        type: String,
        required: true,
      },
    }),
  };
}

class Foo6 extends Model {
  static schema = {
    foo1: Foo1,
  };
}

function throwWarning() {
  // console.log('WARNING!');
  // console.log('>>> ', warning.stack.replace(/\n/g, `\n>>> `));
}

describe('Create document', () => {
  before(async () => {
    maeva.events.on('warning', throwWarning);
    await maeva.connect(mock(), 'test1');
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
  describe('Embedded documents', () => {
    describe('Valid document', () => {
      let doc;
      before(async () => {
        doc = await Foo4.create({field: {foo: 1}});
      });
      it('should have embedded document', () => {
        should(doc).have.property('field').which.is.an.Object();
        should(doc.field).have.property('foo').which.eql('1');
      });
    });
    describe('Invalid document (missing required)', () => {
      let doc, warning;
      before(async () => {
        maeva.events.once('warning', (error) => {
          warning = error;
        });
        doc = await Foo5.create({field: {bar: 1}});
      });
      it('should have empty embedded document', () => {
        should(doc).have.property('field').which.is.an.Object();
        should(Object.keys(doc.field)).have.length(0);
      });
      it('should have warnings', () => {
        should(warning).be.an.instanceOf(Error);
      });
    });
    describe('Partial document', () => {
      let doc;
      before(async () => {
        doc = await Foo4.create({field: {foo: 1, bar: 1}});
      });
      it('should have embedded document', () => {
        should(doc).have.property('field').which.is.an.Object();
        should(doc.field).have.property('foo').which.eql('1');
        should(doc.field).not.have.property('bar');
      });
    });
  });
  describe('Document with association', () => {
    let doc1, doc2;
    before(async () => {
      doc1 = await Foo1.create({field: 'hello'});
      doc2 = await Foo6.create({foo1: doc1});
    });
    it('should have only id instead of all document', () => {
      should(doc2).have.property('foo1').which.eql(doc1.id);
    });
  });
  after(() => {
    maeva.events.removeListener('warning', throwWarning);
  });
});
