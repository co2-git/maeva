/* globals describe it */
import should from 'should';

import * as models from '../test/models';

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
  });
});
