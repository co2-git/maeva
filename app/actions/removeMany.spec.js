/* globals describe it after */
import * as data from '../';
import should from 'should';

import * as models from '../test/models';

describe.skip('Remove Many', () => {
  let teams;
  it('should insert teams', async () => {
    teams = await data.insertMany(models.teamModel, [
      {name: 'PSG'},
      {name: 'Juventus'},
    ]);
  });
  it('should remove teams', async () => {
    const removed = await data.removeMany(models.teamModel);
    should(removed).eql(teams);
  });
  it('collection should be empty', async () => {
    const found = await data.findMany(models.teamModel);
    should(found).eql([]);
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
