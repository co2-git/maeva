/* globals describe it before after */
import should from 'should';

import * as data from '..';
import * as models from '../test-util/models';

describe('Find by id', () => {
  let team;
  it('should insert a team', async () => {
    team = await data.insertOne(models.teamModel, {name: 'PSG'});
  });
  it('should find by document', async () => {
    const found = await data.findById(models.teamModel, team);
    should(found).be.an.Object();
    should(found).have.property('id').which.eql(data.getDocumentId(team));
    should(found).have.property('name').which.eql(team.name);
  });
  it('should find by id', async () => {
    const found = await data.findById(
      models.teamModel,
      data.getDocumentId(team)
    );
    should(found).be.an.Object();
    should(found).have.property('id').which.eql(data.getDocumentId(team));
    should(found).have.property('name').which.eql(team.name);
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
