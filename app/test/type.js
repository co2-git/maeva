/* globals describe it */
import should from 'should';

import * as data from '..';
import * as models from '../test-util/models';
import getType from '../types/getType';
import connector from 'maeva-json';

describe('Type', () => {
  describe('Get type', () => {
    describe('Primitive types', () => {
      describe('String', () => {
        let type;
        it('should return a data type', () => {
          type = getType(String);
          should(type).be.an.Object();
        });
        it('should have a converter', () => {
          should(type).have.property('convert').which.is.a.Function();
        });
        it('should convert strings', () => {
          should(type.convert('hello')).eql('hello');
        });
        it('should convert non-strings', () => {
          should(type.convert(1)).eql('1');
        });
        it('should have a validater', () => {
          should(type).have.property('validate').which.is.a.Function();
        });
        it('should validate strings', () => {
          type.validate('hello');
        });
        it('should not validate non-strings', () => {
          let err;
          try {
            type.validate(123);
          } catch (error) {
            err = error;
          }
          should(err).be.an.Error();
        });
      });
      describe('Number', () => {
        let type;
        it('should return a data type', () => {
          type = getType(Number);
          should(type).be.an.Object();
        });
        it('should have a converter', () => {
          should(type).have.property('convert').which.is.a.Function();
        });
        it('should convert numbers', () => {
          should(type.convert(1)).eql(1);
        });
        it('should convert non-numbers', () => {
          should(type.convert('1')).eql(1);
        });
        it('should have a validater', () => {
          should(type).have.property('validate').which.is.a.Function();
        });
        it('should validate numbers', () => {
          type.validate(1);
        });
        it('should not validate non-numbers', () => {
          let err;
          try {
            type.validate('hello');
          } catch (error) {
            err = error;
          }
          should(err).be.an.Error();
        });
      });
    });
    describe('Complex types', () => {
      describe('Arrays', () => {
        describe('Array syntax', () => {
          let type;
          it('should return a data type', () => {
            type = getType(Array.of(Number));
            should(type).be.an.Object();
          });
          it('should have a converter', () => {
            should(type).have.property('convert').which.is.a.Function();
          });
          it('should convert numbers', () => {
            should(type.convert([1])).eql([1]);
          });
          it('should convert non-numbers', () => {
            should(type.convert(['1'])).eql([1]);
          });
          it('should have a validater', () => {
            should(type).have.property('validate').which.is.a.Function();
          });
          it('should validate numbers', () => {
            type.validate([1]);
          });
          it('should not validate non-numbers', () => {
            let err;
            try {
              type.validate(['hello']);
            } catch (error) {
              err = error;
            }
            should(err).be.an.Error();
          });
        });
        describe('Type syntax', () => {
          let type;
          it('should return a data type', () => {
            type = getType(data.array(Number));
            should(type).be.an.Object();
          });
          it('should have a converter', () => {
            should(type).have.property('convert').which.is.a.Function();
          });
          it('should convert numbers', () => {
            should(type.convert([1])).eql([1]);
          });
          it('should convert non-numbers', () => {
            should(type.convert(['1'])).eql([1]);
          });
          it('should have a validater', () => {
            should(type).have.property('validate').which.is.a.Function();
          });
          it('should validate numbers', () => {
            type.validate([1]);
          });
          it('should not validate non-numbers', () => {
            let err;
            try {
              type.validate(['hello']);
            } catch (error) {
              err = error;
            }
            should(err).be.an.Error();
          });
        });
      });
      describe('Tuples', () => {
        describe('Single type tuple', () => {
          let type;
          it('should return a data type', () => {
            type = getType(data.tuple(Number));
            should(type).be.an.Object();
          });
          it('should have a converter', () => {
            should(type).have.property('convert').which.is.a.Function();
          });
          it('should convert numbers', () => {
            should(type.convert([1])).eql([1]);
          });
          it('should convert non-numbers', () => {
            should(type.convert(['1'])).eql([1]);
          });
          it('should have a validater', () => {
            should(type).have.property('validate').which.is.a.Function();
          });
          it('should validate numbers', () => {
            type.validate([1]);
          });
          it('should not validate non-numbers', () => {
            let err;
            try {
              type.validate(['hello']);
            } catch (error) {
              err = error;
            }
            should(err).be.an.Error();
          });
        });
        describe('Multi type tuple', () => {
          let type;
          it('should return a data type', () => {
            type = getType(data.tuple(Number, String));
            should(type).be.an.Object();
          });
          it('should have a converter', () => {
            should(type).have.property('convert').which.is.a.Function();
          });
          it('should convert accepted values', () => {
            should(type.convert([1, '1'])).eql([1, '1']);
          });
          it('should convert non-accepted values', () => {
            should(type.convert(['1', 1])).eql([1, '1']);
          });
          it('should have a validater', () => {
            should(type).have.property('validate').which.is.a.Function();
          });
          it('should validate accepted values', () => {
            type.validate([1, 'hello']);
          });
          it('should not validate non-accepted values', () => {
            let err;
            try {
              type.validate(['hello', true]);
            } catch (error) {
              err = error;
            }
            should(err).be.an.Error();
          });
        });
      });
      describe('Links', () => {
        let type;
        it('should return a data type', () => {
          type = getType(data.link(
            data.model('foos', {foo: Number})
          ));
          should(type).be.an.Object();
        });
        it('should have a converter', () => {
          should(type).have.property('convert').which.is.a.Function();
        });
        it('should convert ids', () => {
          should(type.convert(
            '1',
            {connector: connector()}
          )).eql(1);
        });
        it('should skip converting if no connector', () => {
          should(type.convert('1')).eql('1');
        });
        it('should convert documents', () => {
          should(type.convert(
            {foo: 22, id: 42},
            {connector: connector()}
          )).eql(42);
        });
        it('should have a validater', () => {
          should(type).have.property('validate').which.is.a.Function();
        });
        it('should validate ids', () => {
          type.validate(
            '1',
            {connector: connector()}
          );
        });
        it('should fail to validate if not valid', () => {
          let err;
          try {
            type.validate('hello');
          } catch (error) {
            err = error;
          }
          should(err).be.an.Error();
        });
        it('should validate documents', () => {
          type.validate(
            type.convert({foo: 22, id: 42}, {connector: connector()}),
            {connector: connector()}
          );
        });
      });
    });
  });
});
