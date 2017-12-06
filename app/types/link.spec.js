/* globals describe it */
import should from 'should';

import * as data from '..';
import getType from '../types/getType';
import connector from 'maeva-json';

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
