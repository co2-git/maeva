/* globals describe it after */
import should from 'should';

import * as data from '..';
import * as models from '../test/models';

describe('Insert One', () => {
  let team;
  it('should insert one team', async () => {
    team = await data.insertOne(models.teamModel, {name: 'Barca'});
    should(team).be.an.Object();
    should(team).have.property('name').which.eql('Barca');
  });
  it('should insert one player', async () => {
    await data.insertOne(models.playerModel, {name: 'Messi', team});
  });
  it('should find player', async () => {
    const found = await data.findOne(models.playerModel, {name: 'Messi', team});
    should(found).be.an.Object();
    should(found).have.property('team').which.eql(data.getDocumentId(team));
    should(found).have.property('name').which.eql('Messi');
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
