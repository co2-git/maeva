/* globals describe it after */
import * as data from '../';
import should from 'should';

import * as models from '../test/models';

describe('Insert Many', () => {
  let teams;
  it('should insert teams', async () => {
    teams = await data.insertMany(models.teamModel, [
      {name: 'PSG'},
      {name: 'Juventus'},
    ]);
    should(teams).be.an.Array().and.have.length(2);
    should(teams[0]).be.an.Object();
    should(teams[0]).have.property('name').which.eql('PSG');
    should(teams[1]).be.an.Object();
    should(teams[1]).have.property('name').which.eql('Juventus');
  });
  it('should find teams', async () => {
    const found = await data.findMany(models.teamModel, {
      name: data.in('PSG', 'Juventus')
    });
    should(found).be.an.Array().and.have.length(2);
    should(found[0]).be.an.Object();
    should(found[0]).have.property('name').which.eql('PSG');
    should(found[1]).be.an.Object();
    should(found[1]).have.property('name').which.eql('Juventus');
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
