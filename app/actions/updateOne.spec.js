/* globals describe it after */
import * as data from '../';
import should from 'should';

import * as models from '../test/models';

describe.skip('Update One', () => {
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
  it.skip('should update first player', async () => {
    const updated = await data.updateOne(
      models.playerModel,
      {},
      {isCaptain: true},
    );
    console.log({updated});
    should(updated).be.an.Object();
    should(updated).have.property('name').which.eql('Cavani');
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
