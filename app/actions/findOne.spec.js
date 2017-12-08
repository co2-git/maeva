/* globals describe it after */
import * as data from '../';
import should from 'should';

import * as models from '../test/models';

describe('Find One', () => {
  let barca;
  it('should insert a team', async () => {
    barca = await data.insertOne(models.teamModel, {name: 'Barca'});
  });
  it('should find team', async () => {
    const found = await data.findOne(models.teamModel, {name: 'Barca'});
    should(found).eql(barca);
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
