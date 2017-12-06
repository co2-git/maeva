/* globals describe it after */
import * as data from '../';
import should from 'should';

import * as models from '../test/models';

describe.skip('Remove by Ids', () => {
  let psg;
  let om;
  it('should insert teams', async () => {
    psg = await data.insertOne(models.teamModel, {name: 'PSG'});
    om = await data.insertOne(models.teamModel, {name: 'OM'});
    await data.insertOne(models.teamModel, {name: 'Liverpool'});
  });
  it('should remove teams by ids', async () => {
    const removed = await data.removeByIds(models.teamModel, [psg, om]);
    should(removed).be.an.Array().and.have.length(2);
  });
  it('should be removed from collection', async () => {
    const found = await data.findMany(models.teamModel);
    should(found).be.an.Array().and.have.length(1);
    should(found[0]).have.property('name').which.eql('Liverpool');
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
