/* global describe it before */

import should from 'should';
import Schema from '../../lib/Schema';
import Field from '../../lib/Field';
import Model from '../../lib/Model';
import * as Type from '../../lib/Type';

const {Tuple: tuple, Embed: embed} = Type;

class ModelA extends Model {
  static schema = {foo: String};
}

describe('Schema', () => {
  let nested;
  before(() => {
    nested = new Schema({
      flat: String,
      flatRequired: {
        type: String,
        required: true,
      },
      flatWithDefault: {
        type: String,
        default: 'hello',
      },
      flatWithValidator: {
        type: String,
        validate: (str) => /^a/.test(str),
      },
      embedded: new Schema({
        flat: String
      }),
      embeddedRequired: {
        type: new Schema({
          flat: String,
        }),
        required: true,
      },
      requiredInEmbedded: new Schema({
        flat: {
          type: String,
          required: true,
        }
      }),
      nestedEmbedded: new Schema({
        embedded: new Schema({
          flat: String
        })
      }),
      superNestedEmbedded: new Schema({
        nestedEmbedded: new Schema({
          embedded: new Schema({
            flat: String
          })
        })
      }),
      inArray: [String],
      inArrayRequired: {
        type: [String],
        required: true,
      },
      embeddedArray: new Schema({
        array: [String],
      }),
      embeddedRequiredArray: new Schema({
        array: {
          type: [String],
          required: true,
        },
      }),
      embeddedWithVariousFields: new Schema({
        field1: {
          type: Boolean,
          default: false,
        },
        field2: {
          type: Boolean,
          default: false,
        },
      })
    });
  });
  describe('Short notation', () => {
    describe('Short notation with function', () => {
      let schema;
      before(() => {
        schema = new Schema({foo: String});
      });
      it('should display type', () => {
        should(schema).have.property('foo').which.is.an.Object();
        should(schema.foo).be.an.instanceof(Field);
        should(schema.foo).have.property('type').which.eql(String);
      });
    });
    describe('Short notation with instance of Schema', () => {
      let schema;
      before(() => {
        schema = new Schema({foo: new Schema({num: Number})});
      });
      it('should display type', () => {
        should(schema).have.property('foo').which.is.an.Object();
        should(schema.foo).be.an.instanceof(Field);
        should(schema.foo).have.property('type')
          .which.is.a.Function();
      });
    });
  });
  describe('Long notation', () => {
    let schema;
    before(() => {
      schema = new Schema({foo: {type: String}});
    });
    it('should display type', () => {
      should(schema).have.property('foo').which.is.an.Object();
      should(schema.foo).have.property('type').which.eql(String);
    });
  });
  describe('Embedded schema (short notation)', () => {
    let schema;
    before(() => {
      schema = new Schema({foo: new Schema({
        foo: String,
        bar: Number,
      })});
    });
    it('should display type', () => {
      should(schema).have.property('foo').which.is.an.Object();
      should(schema.foo).have.property('type').which.is.a.Function();
    });
  });
  describe('Embedded schema (long notation)', () => {
    let schema;
    before(() => {
      schema = new Schema({
        foo: {
          type: new Schema({
            foo: String,
            bar: Number,
          }),
          required: true,
        },
      });
    });
    it('should display type', () => {
      should(schema).have.property('foo').which.is.an.Object();
      should(schema.foo).have.property('type').which.is.a.Function();
      should(schema.foo).have.property('required').which.is.true();
    });
  });
  describe('Array', () => {
    describe('Array.of syntax', () => {
      describe('Short notation', () => {
        it('should convert to Type.Array', () => {
          const schema = new Schema({arrayOfStrings: Array.of(String)});
          should(schema.arrayOfStrings.type)
            .be.a.Function()
            .and.have.property('isMaevaArray').which.is.true();
        });
      });
      describe('Long notation', () => {
        it('should convert to Type.Array', () => {
          const schema = new Schema({arrayOfStrings: {
            type: Array.of(String),
          }});
          should(schema.arrayOfStrings.type)
            .be.a.Function()
            .and.have.property('isMaevaArray').which.is.true();
        });
      });
    });
    describe('Type.Array syntax', () => {
      describe('Short notation', () => {
        it('should convert to Type.Array', () => {
          const schema = new Schema({arrayOfStrings: Type.Array(String)});
          should(schema.arrayOfStrings.type)
            .be.a.Function()
            .and.have.property('isMaevaArray').which.is.true();
        });
      });
      describe('Long notation', () => {
        it('should convert to Type.Array', () => {
          const schema = new Schema({arrayOfStrings: {
            type: Type.Array(String),
          }});
          should(schema.arrayOfStrings.type)
            .be.a.Function()
            .and.have.property('isMaevaArray').which.is.true();
        });
      });
    });
    describe('[] syntax', () => {
      describe('Short notation', () => {
        it('should convert to Type.Array', () => {
          const schema = new Schema({arrayOfStrings: [String]});
          should(schema.arrayOfStrings.type)
            .be.a.Function()
            .and.have.property('isMaevaArray').which.is.true();
        });
      });
      describe('Long notation', () => {
        it('should convert to Type.Array', () => {
          const schema = new Schema({arrayOfStrings: {
            type: [String],
          }});
          should(schema.arrayOfStrings.type)
            .be.a.Function()
            .and.have.property('isMaevaArray').which.is.true();
        });
      });
    });
  });
  describe('Tuple', () => {
    describe('Array.of syntax', () => {
      describe('Short notation', () => {
        it('should convert to Type.Tuple', () => {
          const schema = new Schema({tuples: Array.of(String, Number)});
          should(schema.tuples.type)
            .be.a.Function()
            .and.have.property('isMaevaTuple').which.is.true();
        });
      });
      describe('Long notation', () => {
        it('should convert to Type.Tuple', () => {
          const schema = new Schema({tuples: {
            type: Array.of(String, Number),
          }});
          should(schema.tuples.type)
            .be.a.Function()
            .and.have.property('isMaevaTuple').which.is.true();
        });
      });
    });
    describe('Type.Tuple syntax', () => {
      describe('Short notation', () => {
        it('should convert to Type.Tuple', () => {
          const schema = new Schema({tuples: tuple(String, Number)});
          should(schema.tuples.type)
            .be.a.Function()
            .and.have.property('isMaevaTuple').which.is.true();
        });
      });
      describe('Long notation', () => {
        it('should convert to Type.Tuple', () => {
          const schema = new Schema({tuples: {
            type: tuple(String, Number),
          }});
          should(schema.tuples.type)
            .be.a.Function()
            .and.have.property('isMaevaTuple').which.is.true();
        });
      });
    });
    describe('[] syntax', () => {
      describe('Short notation', () => {
        it('should convert to Type.Tuple', () => {
          const schema = new Schema({tuples: [String, Number]});
          should(schema.tuples.type)
            .be.a.Function()
            .and.have.property('isMaevaTuple').which.is.true();
        });
      });
      describe('Long notation', () => {
        it('should convert to Type.Tuple', () => {
          const schema = new Schema({tuples: {
            type: [String, Number],
          }});
          should(schema.tuples.type)
            .be.a.Function()
            .and.have.property('isMaevaTuple').which.is.true();
        });
      });
    });
  });
  describe('Flatten', () => {
    it('should flatten schema', () => {
      const flatten = nested.flatten();
      should(flatten).have.property('flat')
        .which.is.an.instanceOf(Field);
      should(flatten).have.property('embedded')
        .which.is.an.instanceOf(Field);
      should(flatten).have.property('embedded.flat')
        .which.is.an.instanceOf(Field);
      should(flatten).have.property('nestedEmbedded')
        .which.is.an.instanceOf(Field);
      should(flatten).have.property('nestedEmbedded.embedded')
        .which.is.an.instanceOf(Field);
      should(flatten).have.property('nestedEmbedded.embedded.flat')
        .which.is.an.instanceOf(Field);
      should(flatten).have.property('superNestedEmbedded')
        .which.is.an.instanceOf(Field);
      should(flatten).have.property('superNestedEmbedded.nestedEmbedded')
        .which.is.an.instanceOf(Field);
      should(flatten).have.property(
        'superNestedEmbedded.nestedEmbedded.embedded')
        .which.is.an.instanceOf(Field);
      should(flatten).have.property(
        'superNestedEmbedded.nestedEmbedded.embedded.flat')
        .which.is.an.instanceOf(Field);
      should(flatten).have.property('inArray')
        .which.is.an.instanceOf(Field);
      should(flatten).have.property('embeddedArray')
        .which.is.an.instanceOf(Field);
      should(flatten).have.property('embeddedArray.array')
        .which.is.an.instanceOf(Field);
    });
  });
  describe('Get required fields', () => {
    it('should get required field', () => {
      const required = nested.getRequired();
      should(required).have.property('flatRequired')
        .which.is.an.instanceOf(Field);
      should(required).have.property('embeddedRequired')
        .which.is.an.instanceOf(Field);
      should(required).have.property('requiredInEmbedded.flat')
        .which.is.an.instanceOf(Field);
      should(required).have.property('inArrayRequired')
        .which.is.an.instanceOf(Field);
      should(required).have.property('embeddedRequiredArray.array')
        .which.is.an.instanceOf(Field);
    });
  });
  describe('Get default fields', () => {
    it('should get default field', () => {
      const _default = nested.getDefault();
      should(_default).have.property('flatWithDefault')
        .which.is.an.instanceOf(Field);
    });
  });
  describe('Get fields with custom validators', () => {
    it('should get fields with custom validators', () => {
      const validators = nested.getValidators();
      should(validators).have.property('flatWithValidator')
        .which.is.an.instanceOf(Field);
    });
  });
  describe('Links', () => {
    it('should get fields linked to models', () => {
      const schema = new Schema({modelA: ModelA});
      const links = schema.getLinks();
      should(links).have.property('modelA')
        .which.have.property('isMaevaModel')
        .which.is.true();
    });
  });
  describe('Embedded', () => {
    it('should get fields with embedded schemas', () => {
      const schema = new Schema({embed: embed({foo: String})});
      const embedded = schema.getEmbedded();
      should(embedded).have.property('embed')
        .which.have.property('type')
        .which.have.property('isEmbeddedSchema')
        .which.is.true();
    });
  });
  describe('Type behavior', () => {
    describe('Validate', () => {
      it('should be valid when all fields are present', () => {
        const schema = new Schema({
          embed: nested.embeddedWithVariousFields,
        });
        should(schema.validate({
          embed: {
            field1: true,
            field2: false,
          }
        })).be.true();
      });
      it('should not be valid if required fields are missing', () => {
        const schema = new Schema({
          required: {
            type: Number,
            required: true,
          },
        });
        const document = {};
        should(schema.validate(document)).be.false();
      });
      it('should be valid if non-required fields are missing', () => {
        const schema = new Schema({
          required: {
            type: Number,
            required: true,
          },
          notRequired: {
            type: Number,
            required: false,
          }
        });
        const document = {required: 1};
        should(schema.validate(document)).be.true();
      });
    });
    describe('Convert', () => {
      it('should add default values in missing fields', () => {
        const schema = new Schema({
          embed: nested.embeddedWithVariousFields,
        });
        should(schema.convert({
          embed: {
            field1: true,
          }
        })).eql({
          embed: {
            field1: true,
            field2: false,
          }
        });
      });
    });
  });
});
