/* globals describe it after */
import * as data from '../';
import should from 'should';

import * as models from '../test/models';

describe('Find by ids', () => {
  let teams;
  it('should insert teams', async () => {
    teams = await data.insertMany(models.teamModel, [
      {name: 'Barca'},
      {name: 'Madrid'},
      {name: 'Atletico'}
    ]);
  });
  it('should find documents by Ids', async () => {
    const found = await data.findByIds(models.teamModel, teams);
    should(found).be.an.Array().and.have.length(3);
    should(found).eql(teams);
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
