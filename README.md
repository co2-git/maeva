maeva
===

JS models. Database agnostic.

# Usage

Use `maeva` to define a model.

```js
import {Model, type} from 'maeva';

class User extends Model {
  static schema = {
    name: type(String),
    active: type(Boolean),
    score: type(Number),
  };
}
```

Then use a maeva driver to plug into a database.

```js
import mysql from 'maeva-mysql';

maeva.connect(mysql());

User.insert({name: 'joe', active: true, score: 100});
```

# Population

Supports `lazy population`.
Supports circular dependencies via `getter` syntax.

```javascript
class Team extends Model {
  static schema = {
    name: type(String),
    points: type(Number).default(0),
  };
}

class Country extends Model {
  static schema = {
    name: type(String),
  };
}

class Player extends Model {
  static schema = {
    name: type(String),
    points: type(Number).default(0),
    isCaptain: type(Boolean).default(false),
    team: type(Team),
    country: type(Country),
  };
}

await Players.insertMany(
  {
    name: 'Leo Messi',
    team: await Team.insertOne({name: 'Barca'}),
    country: await Country.insertOne({name: 'Argentina'}),
  },
  {
    name: 'Cristiano Ronaldo',
    team: await Team.insertOne({name: 'Real Madrid'}),
    country: await Country.insertOne({name: 'Portugal'}),
  }
);

const player = await Player.findOne(
  {team: {name: 'Barca'}},
  Player.sort('points'),
);

if (player.isCaptain) {
  await Promise.all([
    player.save(
      player.increment('points', 1),
    ),

    player.team.save(
      player.team.increment('points', 3),
    ),
  ])
}
```

## Objects (embedded documents)

We use key notations (with dots).

```js
{
  temperature: {
    Object: {
      day: Number,
      night: Number,
      unit: {Enum: ['Celsius', 'Fahrenheit', 'Kelvin']}
    }
  }
}
```

## Arrays

Enclose type in array brackets to declare an array:

```js
{
  numbers: {Array: Number},
}
```

## Tuples

An array with more than one type is seen as a tuple:

```js
{
  items: {Tuple: [Number, String]},
}
```

## Mixed

You can declare mixed types such as:

```js
{
  mixed: {Mixed: [Number, String]},
}
```

## Array of mixed

```js
{
  mixed: {Array: {Mixed: [Number, String]}},
}
```

## Any

Accept any type

```js
import {Any} from 'maeva';

{
  any: Any,
}
```

## Enum

```js
{
  greeting: {Enum: ['hello', 'goodbye']},
}
```

## Circular dependencies

In case of cicular dependencies, you can use a getter:

```js
import Bar from './Bar'; // and Bar also imports Foo

Foo {
  // use a getter in order not to get a null value
  get bar = () => {Bar},
}
```

## Required

```js
import {Required} from 'maeva';
{
  email: {String, Required},
}
```

## Default

```js
{
  created: {Date, Default: Date.now},
  score: {Number, Default: 0},
}
```

## Validate

```js
{
  url: {String, Validate: /^https/},
  status: {Number, Validate: (status) => status >= 200 && status < 300}
}
```

# Indexes

Indexes might vary from a database to another but expect standard indexes to be exposed:

```js
import {Index, Unique} from 'maeva';

{
  field: {Number, Index},
  uniqueField: {Number, Unique}
}
```

## Compound indexes

```js
{
  name: {Number, Unique: ['team']},
  team: {Team}
}
```

# Read query

This is how you query a read request:

## Use id

```javascript
Player
  .findOne(
    player.maeva().id,
  );
```

## Add query

```javascript
Player
  .findOne(
    {team: await Team.findOne()},
  );
```

## Use projection

```javascript
Player
  .findOne(

  );
```

# CRUD

All databases expose the same CRUD operations:

- count
- findMany
- findOne
- insert (alias create)
- removeMany
- removeOne
- updateMany
- updateOne
- sum
- subtract
- multipl

## findOne / findMany

```js
const results = await Model.findOne(
  {
    foo: true,
    number: {Above: 10},
    user: await User.findOne()
  },
  Model.Cursor.Limit(100),
  Model.Cursor.Skip(50),
  Model.Cursor.Sort(),
);
```

## Results

```javascript
class Team extends Model {
  static schema = {
    color: {String, Unique},
  };
}

class Player extends Model {
  static schema = {
    active: {Boolean, Default: false},
    created: {Date, Default: Date.now},
    email: {String, Required, Unique, Index},
    pseudo: {String, Unique, Required},
    quotes: {Array: String},
    score: {Number, Default: 100},
    team: {Team, Required, Index},
  };
}

const redTeam = await Team.create({color: 'Red'});

team.log();

Team {
  [[maeva]]: {
    id: teamIdKey,
    version: 0,
    revision: 0,
  },
  color: 'Red',
}

const redPlayer = await Player.create({
  email: 'cool@joe.com',
  pseudo: 'cool joe',
  team,
});

redPlayer.json();

Player {
  [[maeva]]: {
    id: playerIdKey,
    version: 0,
    revision: 0,
  },
  active: true,
  created: Date,
  email: 'cool@joe.com',
  pseudo: 'cool joe',
  quotes: [],
  score: 100,
  team: Team {
    [[maeva]]: {
      id: teamIdKey,
      version: 0,
      revision: 0,
    },
    color: 'Red'
  },
}

const redPlayers = await Player.findMany(redTeam);

redPlayers.json();

Player.Many {
  [[maeva]]: {
    size: 1,
    total: 1,
    page: 1,
    range: 100, // default maeva limit
    pages: 1,
    query: {team: teamIdKey},
  },
  [
    Player {
      [[maeva]]: {
        id: playerIdKey,
        version: 0,
        revision: 0,
      },
      active: true,
      created: Date,
      email: 'cool@joe.com',
      pseudo: 'cool joe',
      quotes: [],
      score: 100,
      team: Team {
        [[maeva]]: {
          id: teamIdKey,
          version: 0,
          revision: 0,
        },
        color: 'Red'
      },
    }
  ],
}

for (const redPlayer of redPlayers) {
  const {revision} = redPlayer.maeva();
  const {pseudo} = redPlayer;
}
```

### Equality

You can ask for value equality such as:

```js
class User extends Model {
  static schema = {
    name: {String},
    score: {Number},
    active: {Boolean},
  }
}

Model.find({name: 'john'});

Model.find({score: 100});

Model.find({active: true});
```

### Key search

Search sub documents by key with dot notation and dollar signs:

```js
class User extends Model {
  static schema = {
    email: {
      Object: {
        default: {String},
        secondaries: {Array: {Object: {name: {String}, address: {String}}}},
      }
    },
  }
}

Model.findOne({'email.default': 'john@doe.com'});

Model.findMany({'email.secondaries.name': 'home'});
```

### Meta search

```js
class User extends Model {
  static schema = {
    score: {Number}
  }
}

Model.findMany({'score': {Above: 0}});

#### Number

- Above <Number>
- Below <Number>
- Between <Number, Number>

#### String

- Contain <RegularExpression | String>
- StartWith <RegularExpression | String>
- EndWith <RegularExpression | String>

#### Date

- Before <Date>
- After <Date>
- Between <Date>, <Date>

#### Object

- HasProperty <String>

#### Array

- HasItem <Any>
- LengthIsBelow <Number>
- LengthIs <Number>
- LengthIsAbove <Number>
```

## projection

You can use the following projection:

- Limit (number)
- Skip (number)
- Range (number) (number..number)
- Sort (view below)
- Reverse (boolean, to reverse order)

```javascript
Model.findOne({}, {Limit: 100, Skip: 50, Sort})
```

## update

```js
Model.updateMany({number: {Above: 0}}, {number: 0}, {Limit: 10});
```

## find with function (slow)

```javascript
Model.findMany(
  (doc) => doc.foo === 2, {Limit: 10}
);
```

# Singleton

```js
const foo = new Foo({bar: 1});
foo.set({bar: 2}).save();
```

# Queries

You can pass meta-queries:

```js
Model.find(
  Not({query: true})
);
```

See a [list of meta queries here](docs/Find Statement.md).

# Connections

You could eventually use more than one database for the same model simultaneously:

```js
import mysql from 'maeva-mysql';
import mongodb from 'maeva-mongodb';
const mysqlConnection = maeva.connect(mysql());
const mongodbConnection = mongodb.connect(mongodb());
User
  .conn(mysqlConnection, mongodbConnection)
  .insert({username: 'foo'});
```

# Hooks

You can pass an array of promises before and after the following operations:

```js
class Foo extends Model {
  static hooks = {
    inserted,
    inserting,
    removed,
    removing,
    updated,
    updating,
  }
}
```
