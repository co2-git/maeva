/* globals describe it */
import should from 'should';

import formatFindQueryValue from './formatFindQueryValue';
import getType from '../types/getType';

describe.only('Format find query value', () => {
  describe('Primitive values', () => {
    describe('String', () => {
      it('should format string', async () => {
        const value = 'hello';
        const expectedValue = value;
        const type = getType(String);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
      it('should format non string', async () => {
        const value = 1;
        const expectedValue = '1';
        const type = getType(String);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
    });
    describe('Number', () => {
      it('should format number', async () => {
        const value = 1;
        const expectedValue = value;
        const type = getType(Number);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
      it('should format non number', async () => {
        const value = '1';
        const expectedValue = 1;
        const type = getType(Number);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
    });
    describe('Boolean', () => {
      it('should format boolean', async () => {
        const value = true;
        const expectedValue = value;
        const type = getType(Boolean);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
      it('should format non boolean', async () => {
        const value = 1;
        const expectedValue = true;
        const type = getType(Boolean);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
    });
    describe('Date', () => {
      it('should format dates', async () => {
        const value = new Date();
        const expectedValue = value;
        const type = getType(Date);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
      it('should format non dates', async () => {
        const date = new Date();
        const value = date.getTime();
        const expectedValue = date;
        const type = getType(Date);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
    });
  });
});
