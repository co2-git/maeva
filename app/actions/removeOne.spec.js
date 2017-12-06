/* globals describe it after */
import * as data from '../';
import should from 'should';

import * as models from '../test/models';

describe.skip('Remove one', () => {
  it('should insert teams', async () => {
    await data.insertMany(models.teamModel, [
      {name: 'PSG'},
      {name: 'Juventus'},
    ]);
  });
  it('should remove one team', async () => {
    const removed = await data.removeOne(models.teamModel, {name: 'PSG'});
    should(removed).have.property('name').which.eql('PSG');
  });
  it('should be removed from collection', async () => {
    const found = await data.findMany(models.teamModel);
    should(found).be.an.Array().and.have.length(1);
    should(found[0]).have.property('name').which.eql('Juventus');
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
