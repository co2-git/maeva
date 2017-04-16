/* globals describe it */
import type from '../../../lib/helpers/type';
import Field from '../../../lib/Field';
import MaevaString from '../../../lib/types/String';
import MaevaNumber from '../../../lib/types/Number';
import MaevaBoolean from '../../../lib/types/Boolean';
import MaevaDate from '../../../lib/types/Date';
import MaevaObject from '../../../lib/types/Object';
import MaevaArray from '../../../lib/types/Array';
import MaevaTuple from '../../../lib/types/Tuple';
import MaevaMixed from '../../../lib/types/Mixed';
import MaevaAny from '../../../lib/types/Any';
import 'should';

describe('type', () => {
  describe('type(String)', () => {
    it('should return a field which type is String', () => {
      const field = type(String);
      field.should.be.an.instanceOf(Field);
      field.type.should.an.instanceOf(MaevaString);
    });
  });

  describe('type(Number)', () => {
    it('should return a field which type is Number', () => {
      const field = type(Number);
      field.should.be.an.instanceOf(Field);
      field.type.should.be.an.instanceOf(MaevaNumber);
    });
  });

  describe('type(Boolean)', () => {
    it('should return a field which type is Boolean', () => {
      const field = type(Boolean);
      field.should.be.an.instanceOf(Field);
      field.type.should.be.an.instanceOf(MaevaBoolean);
    });
  });

  describe('type(Date)', () => {
    it('should return a field which type is Date', () => {
      const field = type(Date);
      field.should.be.an.instanceOf(Field);
      field.type.should.be.an.instanceOf(MaevaDate);
    });
  });

  describe('type.object({foo: type(String)})', () => {
    it('should return a field which type is an Object', () => {
      const field = type.object({foo: type(String)});
      field.should.be.an.instanceOf(Field);
      field.type.should.be.an.instanceOf(MaevaObject);
    });
  });

  describe('type.array(String)', () => {
    it('should return a field which type is an Array', () => {
      const field = type.array(String);
      field.should.be.an.instanceOf(Field);
      field.type.should.be.an.instanceOf(MaevaArray);
    });
  });

  describe('type.tuple(String, Number)', () => {
    it('should return a field which type is a tuple', () => {
      const field = type.tuple(String, Number);
      field.should.be.an.instanceOf(Field);
      field.type.should.be.an.instanceOf(MaevaTuple);
    });
  });

  describe('type.mixed(String, Number)', () => {
    it('should return a field which type is a mixed', () => {
      const field = type.mixed(String, Number);
      field.should.be.an.instanceOf(Field);
      field.type.should.be.an.instanceOf(MaevaMixed);
    });
  });

  describe('type.any()', () => {
    it('should return a field which type is any', () => {
      const field = type.any();
      field.should.be.an.instanceOf(Field);
      field.type.should.be.an.instanceOf(MaevaAny);
    });
  });
});
