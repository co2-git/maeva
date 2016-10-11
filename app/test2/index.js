/* global describe it */
import should from 'should';
import maeva from '..';
import * as other from '..';
import Connection from '../lib/Connection';
import Model from '../lib/Model';
import Schema from '../lib/Schema';
import * as Type from '../lib/Type';

describe('Module', () => {
  describe('Default', () => {
    it('should be Connection', () => {
      should(maeva).eql(Connection);
    });
  });
  describe('Model', () => {
    it('should expose Model', () => {
      should(other.Model).eql(Model);
    });
  });
  describe('Schema', () => {
    it('should expose Schema', () => {
      should(other.Schema).eql(Schema);
    });
  });
  describe('Type', () => {
    it('should expose Type', () => {
      should(other.Type).eql(Type);
    });
  });
});
