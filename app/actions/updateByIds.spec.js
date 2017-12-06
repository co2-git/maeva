/* globals describe it after */
import * as data from '../';
import should from 'should';

import * as models from '../test/models';

describe.skip('Update by ids', () => {
  let psg;
  let mbappe;
  let neymar;
  it('should insert a team', async () => {
    psg = await data.insertOne(models.teamModel, {name: 'PSG'});
  });
  it('should insert players in team', async () => {
    mbappe = await data.insertOne(models.playerModel, {
      name: 'M\'Bappe',
      team: psg,
    });
    neymar = await data.insertOne(models.playerModel, {
      name: 'Neymar',
      team: psg,
    });
    await data.insertMany(models.playerModel, [
      {name: 'Cavani', team: psg},
      {name: 'Alves', team: psg}
    ]);
  });
  it.skip('should update players by id', async () => {
    const updated = await data.updateByIds(
      models.playerModel,
      [mbappe, neymar],
      {'stats.goals': 500}
    );
    should(updated).be.an.Array().and.have.length(2);
    should(updated[0]).have.property('name').which.eql('M\'Bappe');
    should(updated[0]).have.property('stats').which.eql({goals: 500});
    should(updated[0]).have.property('name').which.eql('Neymar');
    should(updated[0]).have.property('stats').which.eql({goals: 500});
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
