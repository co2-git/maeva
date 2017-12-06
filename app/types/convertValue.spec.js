/* globals describe it */
import should from 'should';

import * as data from '..';
import convertValue from './convertValue';
import getType from '../types/getType';
import connector from 'maeva-json';

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
