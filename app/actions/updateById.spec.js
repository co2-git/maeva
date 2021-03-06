/* globals describe it after */
import * as data from '../';
import should from 'should';
import idsAreSame from '../connect/idsAreSame';

import * as models from '../test/models';

describe('Update by id', () => {
  let psg;
  it('should insert teams', async () => {
    psg = await data.insertOne(models.teamModel, {name: 'PSG'});
    await data.insertMany(models.teamModel, [
      {name: 'Manchester United'},
      {name: 'Manchester City'},
    ]);
  });
  it('should update a team by its id', async () => {
    const updated = await data.updateById(
      models.teamModel,
      psg,
      {name: 'Liverpool'}
    );
    should(updated).be.an.Object();
    should(updated).have.property('name').which.eql('Liverpool');
    should(idsAreSame(updated, psg)).eql(true);
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
