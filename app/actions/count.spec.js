/* globals describe it after */
import should from 'should';

import * as data from '..';
import * as models from '../test/models';

describe.only('Count', () => {
  let barca;
  let madrid;
  let psg;
  it('should insert 5 teams', async () => {
    await data.insertMany(models.teamModel, [
      {name: 'Barca'},
      {name: 'Madrid'},
      {name: 'PSG'},
      {name: 'Liverpool'},
      {name: 'Ajax'},
    ]);
  });
  it('should count 5 teams', async () => {
    const count = await data.count(models.teamModel);
    should(count).eql(5);
  });
  it('should insert players', async () => {
    barca = await data.findOne(models.teamModel, {name: 'Barca'});
    madrid = await data.findOne(models.teamModel, {name: 'Madrid'});
    psg = await data.findOne(models.teamModel, {name: 'PSG'});
    await data.insertMany(models.playerModel, [
      {
        name: 'Messi',
        team: barca,
        stats: {
          goals: '1000',
        },
      },
      {
        name: 'Iniesta',
        team: barca,
        isCaptain: true,
      },
      {
        name: 'Suarez',
        team: barca,
        stats: {
          goals: 500,
        },
      },
      {
        name: 'Ronaldo',
        team: madrid,
        stats: {
          goals: 1,
        },
      },
      {
        name: 'Benzema',
        team: madrid,
        stats: {
          goals: 1,
        },
      },
      {
        name: 'Isco',
        team: madrid,
      },
      {
        name: 'Neymar',
        team: psg,
        stats: {
          goals: 750,
        },
      },
      {
        name: 'M\'Bappe',
        team: psg,
        stats: {
          goals: 600,
        },
      },
    ]);
  });
  it('should count users by team', async () => {
    // team=0
    const count = await data.count(models.playerModel, {team: barca});
    should(count).eql(3);
  });
  it('should count users by who is captain', async () => {
    // isCaptain=true
    const count = await data.count(models.playerModel, {isCaptain: true});
    should(count).eql(1);
  });
  it('should count users by goals', async () => {
    // stats.goals=1000
    const count = await data.count(models.playerModel, {'stats.goals': 1000});
    should(count).eql(1);
  });
  it.skip('should count users by team and is captain', async () => {
    // team=0&isCaptain=false
    const count = await data.count(models.playerModel, {
      team: barca,
      isCaptain: false
    });
    should(count).eql(2);
  });
  it.skip('should count users by excluding team', async () => {
    // team!=1
    const count = await data.count(models.playerModel, {
      team: data.not(madrid),
    });
    should(count).eql(5);
  });
  it.skip('should count users by inclusive teams', async () => {
    // team=0,1
    const count = await data.count(models.playerModel, {
      team: data.in(madrid, barca),
    });
    should(count).eql(6);
  });
  it.skip('should count users by exclusive teams', async () => {
    // team!=0,1
    const count = await data.count(models.playerModel, {
      team: data.out(madrid, barca),
    });
    should(count).eql(2);
  });
  it.skip('should count users by above goals', async () => {
    // stats.goals>500
    const count = await data.count(models.playerModel, {
      'stats.goals': data.above(500),
    });
    should(count).eql(3);
  });
  it.skip('should count users by below goals', async () => {
    // stats.goals<500
    const count = await data.count(models.playerModel, {
      'stats.goals': data.below(500),
    });
    should(count).eql(2);
  });
  it.skip('should count users by between goals', async () => {
    // stats.goals>500&stats.goals<1000
    const count = await data.count(models.playerModel, data.and(
      {'stats.goals': data.above(500)},
      {'stats.goals': data.below(1000)},
    ));
    should(count).eql(2);
  });
  it.skip('should count users by either is capitain or goal', async () => {
    // stats.goals>500|isCaptain=true
    const count = await data.count(models.playerModel, data.or(
      {'stats.goals': data.above(500)},
      {isCaptain: true},
    ));
    should(count).eql(2);
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
