/* globals describe it after */
import should from 'should';

import * as data from '..';
import * as models from '../test-util/models';

describe('Insert One', () => {
  let team;
  it('should insert one team', async () => {
    team = await data.insertOne(models.teamModel, {name: 'Barca'});
  });
  it('should insert one player', async () => {
    await data.insertOne(models.playerModel, {name: 'Messi', team});
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
