/* globals describe it */
import 'should';
import MaevaTypeObject from '../../../lib/types/Object';
import MaevaTypeNumber from '../../../lib/types/Number';
import Field from '../../../lib/Field';
import type from '../../../lib/helpers/type';

describe('Type Object', () => {
  describe('Construct', () => {
    it('should transform fields', () => {
      const object = new MaevaTypeObject({
        foo: type(Number)
      });
      object.shape.should.be.an.Object();
      object.shape.foo.should.be.an.instanceof(Field);
      object.shape.foo.type.should.be.an.instanceof(MaevaTypeNumber);
    });
  });

  describe('Convert', () => {
    it('should convert fields', () => {
      const object = new MaevaTypeObject({
        foo: type(Number)
      });
      const converted = object.convert({foo: '2'});
      converted.foo.should.eql(2);
    });
  });

  describe('Validate', () => {
    it('should validate fields', () => {
      const object = new MaevaTypeObject({
        foo: type(Number)
      });
      const valid = object.validate({foo: 2});
      valid.should.be.true();
    });
  });
});
