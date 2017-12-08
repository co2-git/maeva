import * as data from '..';

export const teamModel = data.model('teams', {
  name: String,
});

export const playerModel = data.model('players', {
  name: String,
  isCaptain: Boolean,
  team: data.link(teamModel),
  stats: data.shape({
    goals: Number,
  }),
}, {
  default: {
    'isCaptain': false,
    'stats.goals': 0,
  },
  required: ['name', 'team'],
});
