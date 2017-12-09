/* globals describe it after */
import * as data from '../';
import should from 'should';

import * as models from '../test/models';

describe('Update Many', () => {
  let psg;
  it('should insert team', async () => {
    psg = await data.insertOne(models.teamModel, {name: 'PSG'});
  });
  it('should insert players in team', async () => {
    await data.insertMany(models.playerModel, [
      {name: 'Cavani', team: psg},
      {name: 'Alves', team: psg},
      {name: 'Neymar', team: psg},
      {name: 'Rabbiot', team: psg},
    ]);
  });
  it('should update many players', async () => {
    const updated = await data.updateMany(
      models.playerModel,
      {},
      {isCaptain: true},
    );
    should(updated).be.an.Array();
    should(updated[0]).have.property('name').which.eql('Cavani');
    should(updated[0]).have.property('isCaptain').which.eql(true);
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
