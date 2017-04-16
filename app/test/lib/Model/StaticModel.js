/* globals describe it */
import 'should';
import uuid from 'uuid';
import StaticModel from '../../../lib/Model/StaticModel';
import Field from '../../../lib/Field';
import Model from '../../../lib/Model';
import MaevaTypeString from '../../../lib/types/String';
import MaevaTypeObject from '../../../lib/types/Object';
import MaevaTypeNumber from '../../../lib/types/Number';
import MaevaTypeDate from '../../../lib/types/Date';

class Foo extends Model {
  static collectionName = 'bar';
  static version = 4;
  static schema = {
    foo: new Field(String),
  };
}

describe('Static Model', () => {
  describe('Foo should be a StaticModel', () => {
    it('should be an instance of Static Model', () => {
      new Foo().should.be.an.instanceof(StaticModel);
    });
  });

  describe('Collection name', () => {
    it('should be an empty string for parent', () => {
      StaticModel.collectionName.should.eql('');
    });
  });

  describe('Maeva schema', () => {
    describe('Field name', () => {
      it('should be a field', () => {
        Foo.maevaSchema
          .should.be.an.instanceOf(Field);
      });

      it('should be an object', () => {
        Foo.maevaSchema
          .type
          .should.be.an.instanceOf(MaevaTypeObject);
      });
    });

    describe('Field id', () => {
      it('should be a field', () => {
        Foo.maevaSchema
          .type
          .shape
          .id
          .should.be.an.instanceOf(Field);
      });

      it('should be a string', () => {
        Foo.maevaSchema
          .type
          .shape
          .id
          .type
          .should.be.an.instanceOf(MaevaTypeString);
      });

      it('should default to uuid v4 as id generator', () => {
        Foo.maevaSchema
          .type
          .shape
          .id
          .attributes
          .default
          .should.eql(uuid.v4);
      });
    });

    describe('Field version', () => {
      it('should be a field', () => {
        Foo.maevaSchema
          .type
          .shape
          .version
          .should.be.an.instanceOf(Field);
      });

      it('should be a number', () => {
        Foo.maevaSchema
          .type
          .shape
          .version
          .type
          .should.be.an.instanceOf(MaevaTypeNumber);
      });

      it('should default to model version', () => {
        Foo.maevaSchema
          .type
          .shape
          .version
          .attributes
          .default(new Foo())
          .should.eql(Foo.version);
      });
    });

    describe('Field revision', () => {
      it('should be a field', () => {
        Foo.maevaSchema
          .type
          .shape
          .revision
          .should.be.an.instanceOf(Field);
      });

      it('should be a number', () => {
        Foo.maevaSchema
          .type
          .shape
          .revision
          .type
          .should.be.an.instanceOf(MaevaTypeNumber);
      });

      it('should default to 0', () => {
        Foo.maevaSchema
          .type
          .shape
          .revision
          .attributes
          .default
          .should.eql(0);
      });
    });

    describe('Field inserted', () => {
      it('should be a field', () => {
        Foo.maevaSchema
          .type
          .shape
          .inserted
          .should.be.an.instanceOf(Field);
      });

      it('should be a date', () => {
        Foo.maevaSchema
          .type
          .shape
          .inserted
          .type
          .should.be.an.instanceOf(MaevaTypeDate);
      });

      it('should default to now', () => {
        Foo.maevaSchema
          .type
          .shape
          .inserted
          .attributes
          .default
          .should.eql(Date.now);
      });
    });

    describe('Field updated', () => {
      it('should be a field', () => {
        Foo.maevaSchema
          .type
          .shape
          .updated
          .should.be.an.instanceOf(Field);
      });

      it('should be a date', () => {
        Foo.maevaSchema
          .type
          .shape
          .updated
          .type
          .should.be.an.instanceOf(MaevaTypeDate);
      });

      it('should default to now', () => {
        Foo.maevaSchema
          .type
          .shape
          .updated
          .attributes
          .default
          .should.eql(Date.now);
      });
    });
  });

  describe('Default schema', () => {
    it('should be an empty object', () => {
      StaticModel.schema.should.eql({});
    });
  });

  describe('Default version', () => {
    it('should be 0 for parent', () => {
      StaticModel.version.should.eql(0);
    });
    it(`should be ${Foo.version} for child`, () => {
      Foo.version.should.eql(Foo.version);
    });
  });

  describe('To JSON', () => {
    it('should JSON parent', () => {
      StaticModel
        .toJSON()
        .should.eql({
          collection: 'staticmodels',
          schema: {},
          version: 0,
        });
    });

    it('should JSON child', () => {
      Foo
        .toJSON()
        .should.eql({
          collection: 'bar',
          schema: {
            foo: {
              required: false,
              type: 'String',
            }
          },
          version: 4,
        });
    });
  });

  describe('count', () => {
    // ...
  });

  describe('Find many', () => {
    // ...
  });

  describe('Find one', () => {
    // ...
  });

  describe('Insert many', () => {
    // ...
  });

  describe('Insert one', () => {
    // ...
  });

  describe('Remove many', () => {
    // ...
  });

  describe('Update one', () => {
    // ...
  });

  describe('Update many', () => {
    // ...
  });
});
