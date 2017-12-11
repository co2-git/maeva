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
  it('should return null if no such collection', async () => {
    const fakeModel = {...models.teamModel};
    fakeModel.name = 'trololo';
    const found = await data.findOne(fakeModel, {name: 'Arsenal'});
    should(found).be.null();
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
