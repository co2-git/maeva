/* globals describe it after */
import should from 'should';

import * as data from '..';
import * as models from '../test-util/models';
import convertFields, {convertValue} from '../model/convertFields';
import getType from '../types/getType';
import connector from '../test-util/connector';

describe('Model', () => {
  describe('Define model', () => {
    it('should be an object', () => {
      should(models.teamModel).be.an.Object();
      should(models.playerModel).be.an.Object();
    });
    it('should be a name', () => {
      should(models.teamModel).have.property('name').which.eql('teams');
      should(models.playerModel).have.property('name').which.eql('players');
    });
    it('should have fields', () => {
      should(models.teamModel)
        .have.property('fields')
        .which.is.an.Object();
      should(models.teamModel.fields)
        .have.property('name')
        .which.is.a.Function();
      should(models.teamModel.fields)
        .have.property('custom')
        .which.is.an.Object();
      should(models.teamModel.fields.custom)
        .have.property('convert')
        .which.is.a.Function();
      should(models.teamModel.fields.custom)
        .have.property('validate')
        .which.is.a.Function();
    });
  });

  describe('Model helpers', () => {
    describe('Apply default', () => {});

    describe('Apply validators', () => {});

    describe('Convert fields', () => {
      describe('Convert value', () => {
        describe('Primitive types', () => {
          describe('String', () => {
            it('should convert value', async () => {
              const converted = await convertValue(1, getType(String));
              should(converted).eql('1');
            });
          });
          describe('Number', () => {
            it('should convert value', async () => {
              const converted = await convertValue('1', getType(Number));
              should(converted).eql(1);
            });
          });
          describe('Boolean', () => {
            it('should convert value', async () => {
              const converted = await convertValue(0, getType(Boolean));
              should(converted).eql(false);
            });
          });
          describe('Date', () => {
            it('should convert value', async () => {
              const date = new Date();
              const converted = await convertValue(
                date.getTime(),
                getType(Date)
              );
              should(converted).eql(date);
            });
          });
        });
        describe('Complex types', () => {
          describe('Object', () => {
            it('should convert value', async () => {
              const converted = await convertValue(
                {text: 1},
                getType(data.shape({text: String}))
              );
              should(converted).eql({text: '1'});
            });
          });
          describe('Array', () => {
            describe('Array syntax', () => {
              it('should convert value', async () => {
                const converted = await convertValue(
                  ['1'],
                  getType(Array.of(Number))
                );
                should(converted).eql([1]);
              });
            });
            describe('Array type', () => {
              it('should convert value', async () => {
                const converted = await convertValue(
                  ['1'],
                  getType(data.array(Number))
                );
                should(converted).eql([1]);
              });
            });
          });
          describe('Links', () => {
            it('should convert value', async () => {
              const converted = await convertValue(
                {id: 1, foo: 'name'},
                getType(data.link(data.model('foos', {foo: String}))),
                {connector: connector()}
              );
              should(converted).eql(1);
            });
          });
        });
      });
      describe('Convert fields', () => {
        describe('Primitive types', () => {});
        describe('Complex types', () => {
          describe('Links', () => {
            it('should convert fields with links', async () => {
              const converted = await convertFields(
                {
                  name: 'Messi',
                  team: {id: 0, name: 'Barca'}
                },
                models.playerModel,
                {connector: connector()}
              );
              should(converted).be.an.Object();
              should(converted).has.property('name').which.eql('Messi');
              should(converted).has.property('team').which.eql(0);
            });
          });
        });
      });
    });

    describe('Did insert', () => {});

    describe('Format Pre-Insert document', () => {});

    describe('Format Post-Insert document', () => {});

    describe('Validate fields', () => {});

    describe('Will insert', () => {});
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
