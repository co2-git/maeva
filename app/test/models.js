import * as data from '..';

export const teamModel = data.model('teams', {
  name: String,
  custom: data.type({
    convert: (value) => {
      if (typeof Number(value) === 'number') {
        return value + 5;
      }
      return value;
    },
    validate: (value) => {
      if (isNaN(value)) {
        throw new Error('Expects custom to be a number');
      }
    }
  })
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
