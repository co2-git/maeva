/* global describe it */
import should from 'should';
import Field from '../../lib/Field';
import {
  string,
  number,
} from '../../test-utils/schema';
import {Type, Model} from '../..';

const {Embed: embed} = Type;

class Foo extends Model {
  static schema = {foo: Number};
}

function verifyField(field, type, associatedType) {
  it('should have the right type', () => {
    should(field).have.property('type').which.eql(type);
  });
  it('should have the right associated type', () => {
    should(field).have.property('$type').which.eql(associatedType);
  });
}

describe('Field', () => {
  describe('Unit', () => {
    it('should be a function', () => {
      should(Field).be.a.Function();
    });
  });
  describe('Types', () => {
    describe('String', () => {
      verifyField(new Field(string), String, Type.String);
    });
    describe('Number', () => {
      verifyField(new Field(number), Number, Type.Number);
    });
  });
  describe('Serialize', () => {
    it('should show type names', () => {
      const field = new Field({
        type: String,
        required: false,
        default: 0,
      }).toJSON();
      should(field).have.property('type').which.eql('String');
      should(field).have.property('required').which.is.false();
      should(field).have.property('default').which.eql(0);
    });
    it('should show default function', () => {
      const field = new Field({
        type: String,
        default: (value) => /^a/.test(value),
      }).toJSON();
      should(field).have.property('default').which.is.a.String();
    });
    it('should JSON deep embedded schemas', () => {
      const field = new Field({
        type: embed({foo: String}),
      }).toJSON();
      should(field).have.property('type').which.eql('maevaEmbeddedSchema');
    });
  });
});
