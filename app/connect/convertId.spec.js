/* globals describe it */
import should from 'should';
import convertId from './convertId';
import * as data from '..';

describe('Convert ID', () => {
  it('should convert document to id', () => {
    const converted = convertId({id: '1'}, {connection: data.connections[0]});
    const expected = 1;
    should(converted).eql(expected);
  });
  it('should convert id to id', () => {
    const converted = convertId('1', {connection: data.connections[0]});
    const expected = 1;
    should(converted).eql(expected);
  });
});
