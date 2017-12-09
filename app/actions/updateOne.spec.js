/* globals describe it after */
import * as data from '../';
import should from 'should';

import * as models from '../test/models';

describe('Update One', () => {
  let psg;
  it('should insert team', async () => {
    psg = await data.insertOne(models.teamModel, {name: 'PSG'});
  });
  it('should insert players in team', async () => {
    await data.insertMany(models.playerModel, [
      {name: 'Cavani', team: psg},
      {name: 'Alves', team: psg},
      {name: 'Neymar', team: psg, stats: {goals: 100}},
      {name: 'Rabbiot', team: psg},
    ]);
  });
  it('should update first player', async () => {
    const updated = await data.updateOne(
      models.playerModel,
      {},
      {isCaptain: true},
    );
    should(updated).be.an.Object();
    should(updated).have.property('name').which.eql('Cavani');
  });
  it('should increment goals', async () => {
    const updated = await data.updateOne(
      models.playerModel,
      {name: 'Neymar'},
      {'stats.goals': data.add(100)},
    );
    should(updated).have.property('stats').which.eql({goals: 200});
  });
  it('should decrement goals', async () => {
    const updated = await data.updateOne(
      models.playerModel,
      {name: 'Neymar'},
      {'stats.goals': data.subtract(100)},
    );
    should(updated).have.property('stats').which.eql({goals: 100});
  });
  it('should multiply goals', async () => {
    const updated = await data.updateOne(
      models.playerModel,
      {name: 'Neymar'},
      {'stats.goals': data.multiply(10)},
    );
    should(updated).have.property('stats').which.eql({goals: 1000});
  });
  it.skip('should divide goals', async () => {
    const updated = await data.updateOne(
      models.playerModel,
      {name: 'Neymar'},
      {'stats.goals': data.divide(2)},
    );
    should(updated).have.property('stats').which.eql({goals: 500});
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
