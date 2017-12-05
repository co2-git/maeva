/* globals describe it after */
import should from 'should';

import * as data from '..';
import * as models from '../test-util/models';

describe('Count', () => {
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
    const count = await data.count(models.playerModel, {team: barca});
    should(count).eql(3);
  });
  it('should count users by who is captain', async () => {
    const count = await data.count(models.playerModel, {isCaptain: true});
    should(count).eql(1);
  });
  it('should count users by goals', async () => {
    const count = await data.count(models.playerModel, {'stats.goals': 1000});
    should(count).eql(1);
  });
  it('should count users by team and is captain', async () => {
    const count = await data.count(models.playerModel, {
      team: barca,
      isCaptain: false
    });
    should(count).eql(2);
  });
  it('should count users by excluding team', async () => {
    const count = await data.count(models.playerModel, {
      team: data.not(madrid),
    });
    should(count).eql(5);
  });
  it.skip('should count users by inclusive teams', async () => {
    const count = await data.count(models.playerModel, {
      team: data.in('Madrid', 'Barca'),
    });
    should(count).eql(6);
  });
  it.skip('should count users by exclusive teams', async () => {
    const count = await data.count(models.playerModel, {
      team: data.out('Madrid', 'Barca'),
    });
    should(count).eql(2);
  });
  it.skip('should count users by above goals', async () => {
    const count = await data.count(models.playerModel, {
      'stats.goal': data.above(500),
    });
    should(count).eql(2);
  });
  it.skip('should count users by below goals', async () => {
    const count = await data.count(models.playerModel, {
      'stats.goal': data.below('500'),
    });
    should(count).eql(2);
  });
  it.skip('should count users by between goals', async () => {
    const count = await data.count(models.playerModel, {
      'stats.goal': data.in(data.above('500'), data.below('1000')),
    });
    should(count).eql(2);
  });
  after(async () => {
    await data.removeMany(models.teamModel);
    await data.removeMany(models.playerModel);
  });
});
