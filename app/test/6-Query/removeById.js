/* global describe it */

import should from 'should';
import Model from '../../lib/Model/extend/Statement';

describe('Remove by id', () => {
  describe('Unit', () => {
    it('should be a function', () => {
      should(Model).have.property('removeById').which.is.a.Function();
    });
  });
});
