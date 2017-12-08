/* globals describe it */
import validateId from './validateId';
import * as data from '..';

describe('Validate ID', () => {
  it('should validate document', () => {
    validateId({id: 1}, {connection: data.connections[0]});
  });
  it('should convert id to id', () => {
    validateId(1, {connection: data.connections[0]});
  });
});
