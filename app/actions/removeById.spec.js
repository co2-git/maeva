/* globals describe it after */
import * as data from '../';
import should from 'should';

import * as models from '../test/models';

describe.skip('Remove by Id', () => {
  let psg;
  it('should insert teams', async () => {
    psg = await data.insertOne(models.teamModel, {name: 'PSG'});
    await data.insertOne(models.teamModel, {name: 'OM'});
  });
  it('should remove one team', async () => {
    const removed = await data.removeById(models.teamModel, psg);
    should(removed).have.property('name').which.eql('PSG');
  });
  it('should be removed from collection', async () => {
    const found = await data.findMany(models.teamModel);
    should(found).be.an.Array().and.have.length(1);
    should(found[0]).have.property('name').which.eql('OM');
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
