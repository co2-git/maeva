/* globals describe it after */
import * as data from '../';
import should from 'should';
import map from 'lodash/map';

import * as models from '../test/models';

describe('Find many', () => {
  let teams;
  let players;
  it('should insert teams', async () => {
    teams = await data.insertMany(models.teamModel, [
      {name: 'PSG'},
      {name: 'Barca'},
      {name: 'Bayer'},
      {name: 'Madrid'},
    ]);
  });
  it('should find teams', async () => {
    const found = await data.findMany(models.teamModel);
    should(found).eql(teams);
  });
  it('should insert players', async () => {
    players = await data.insertMany(models.playerModel, [
      {name: 'Iniesta', team: teams[1], isCaptain: true, stats: {goals: 2}},
      {name: 'Messi', team: teams[1], stats: {goals: 999999}},
      {name: 'Ronaldo', team: teams[3], stats: {goals: -1}},
      {name: 'Ramos', team: teams[3], isCaptain: true},
      {name: 'Neymar', team: teams[0], stats: {goals: 2000}},
      {name: 'MBappe', team: teams[0], stats: {goals: 1777}},
      {name: 'Suarez', team: teams[1], stats: {goals: 5000}},
    ]);
  });
  it('should find players of Barca', async () => {
    const found = await data.findMany(models.playerModel, {team: teams[1]});
    should(found).be.an.Array().and.have.length(3);
    for (const player of found) {
      should(player.team).eql(data.getDocumentId(teams[1]));
    }
  });
  it('should find players who scored more than 100 goals', async () => {
    const found = await data.findMany(models.playerModel, {
      'stats.goals': data.above(100)
    });
    should(found).be.an.Array().and.have.length(4);
    for (const player of found) {
      should(player.stats.goals).be.above(100);
    }
  });
  it('should find 3 first players', async () => {
    const found = await data.findMany(models.playerModel, {}, {range: 3});
    should(found).be.an.Array().and.have.length(3);
  });
  it('should find 3 first players starting at second', async () => {
    const found = await data.findMany(models.playerModel, {}, {
      range: [1, 3]
    });
    should(found).eql([
      players[1],
      players[2],
      players[3],
    ]);
  });
  it('should find players ordered by name', async () => {
    const found = await data.findMany(models.playerModel, {}, {
      sort: 'name'
    });
    const expectedNames = map(players, 'name').sort();
    const foundNames = map(found, 'name').sort();
    should(expectedNames).eql(foundNames);
  });
  it('should find players ordered by name reverse', async () => {
    const found = await data.findMany(models.playerModel, {}, {
      sort: {name: -1}
    });
    const expectedNames = map(players, 'name').sort().reverse();
    const foundNames = map(found, 'name').sort().reverse();
    should(expectedNames).eql(foundNames);
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
