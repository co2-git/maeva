/* globals describe it after */
import * as data from '../';
import should from 'should';

import * as models from '../test/models';

describe.skip('Insert Many', () => {
  it.skip('should insert teams', async () => {
    const teams = await data.insertMany(models.teamModel, [
      {name: 'PSG'},
      {name: 'Juventus'},
    ]);
    should(teams).eql([
      {name: 'PSG', id: 1},
      {name: 'Juventus', id: 2},
    ]);
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
