/* globals describe it after */
import * as data from '../';
import should from 'should';

import * as models from '../test/models';

describe('Find many', () => {
  let teams;
  it('should insert teams', async () => {
    teams = await data.insertMany(models.teamModel, [
      {name: 'Barca'},
      {name: 'Bayer'},
      {name: 'PSG'},
    ]);
  });
  it('should find teams', async () => {
    const found = await data.findMany(models.teamModel);
    should(found).eql(teams);
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
