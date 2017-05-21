mavea - Relations
===

How to create relations between models

```javascript

const teams = {
  name: 'teams',
  fields: {
    name: String,
    victories: Number,
    losses: Number,
  },
};

const players = {
  name: 'players',
  fields: {
    isCaptain: boolean,
    name: String,
    score: {type: Number, default: 0},
    team: {link: teams},
  }
};

// insert a new player and a new team

await insertOne(players, {
  name: 'Jessica',
  isCaptain: true,
  team: await insertOne(teams, {name: 'Dolphins'}),
});

// get team's players

await findMany(players, {team: {name: 'Dolphins'}});

// update a team using player

const player = await findOne(players);
if (player.isCaptain && player.score > 100) {
  await updateOne(teams, player.team, {victories: player.team.victories + 1});
}

// remove a team using player

const player = await findOne(players);
if (player.isCaptain && player.score < 100) {
  await removeOne(teams, player.team);
}
```
