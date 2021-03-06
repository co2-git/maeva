Maeva | Types | Link
===

Link a model to another one.

```javascript
import * as data from 'maeva';

const teamModel = data.model('teams', {name: String});
const playerModel = data.model('players', {name: String, team: data.link(teamModel)});

// Get a player by team
const teamPlayers = await data.findMany('players', {team: {name: 'Red Team'}});

// Get player and its team
const player = await data.findOne('players', {}, {populate: 'team'});
console.log(player.team.name);

// One-to-many relationships (player belongs to more than 1 team)
const playerModel = data.model('players', {name: String, teams: Array.of(data.link(teamModel))});
```
