maeva
===

JS models. Database agnostic.

# Usage

```js
import * as maeva from 'maeva';
import mysql from '@maeva/mysql';

# Use Maeva to define a model

const players = maeva.model({
  name: 'players',
  fields: {
    name: String,
    score: Number,
  },
});

# Then use a maeva driver to plug into a database.

const connector = mysql('mysql://192.1.1.1');

maeva.connect(connector);

await maeva.insertOne(players, {name: 'Joe', score: 100});
await maeva.findOne(players, {name: 'Joe'});
await maeva.updateOne(players, {name: 'Joe' }, {score: 0});
await maeva.removeOne(players, {name: 'Joe'});
```

- [Model](doc/Model.md)
- [Types]
  - [String]
  - [Number]
  - [Boolean]
  - [Date]
  - [Object](doc/types/Object.md)
  - [Array](doc/types/Array.md)
- [Relations](doc/Relations.md)
- []

## Tuples

An array with more than one type is seen as a tuple:

```js
maeva.model({
  fields: {foo: [String, Number]}
});
```

## Mixed

You can declare mixed types such as:

```js
maeva.model({
  fields: {
    mixed: mavea.mixed(String, Number),
  }
});
```

## Array of mixed

```js
mavea.model({field: mavea.array.mixed(Number, String)});

```

## Any

Accept any type

```js
{
  any: type.any(),
}
```

## Enum

```js
{
  languages: type.values('es', 'en'),
}
```

## Circular dependencies

In case of cicular dependencies, you can use a getter:

```js
import Bar from './Bar'; // and Bar also imports Foo

Foo {
  // use a getter in order not to get a null value
  get bar = () => type(Bar),
}
```

## Required

```js
maeva.model({field: {type: String, required: true}});
{
  email: type(String).isRequired(),
}
```

## Default

```js
{
  created: type(Date).default(Date.now),
  score: type(Number).default(0),
}
```

## Validate

```js
{
  url: type(String).validate(/^https/),
  status: type(Number).validate((status) => status >= 200 && status < 300)
}
```

# Indexes

Indexes might vary from a database to another but expect standard indexes to be exposed:

```js
{
  field: type(Number).index(),
  uniqueField: type(Number).unique()
}
```

## Compound indexes

```js
{
  name: type(Number).index({with: 'Team'}),
  team: type(Team),
}
```

## Use projection

```javascript
Player
  .findOne(
    {},
    {
      limit: 100,
      skip: 50,
      order:
    }
  );
```

# Query

## String

```javascript
class Foo extends Model {
  static schema = {name: type(String)};
}

Foo.find({name: 'joe'});
Foo.find({name: {not: 'joe'}});
Foo.find({name: /joe/});
Foo.find({name: {not: /joe/}});
Foo.find({name: {like: 'j*e'}});
Foo.find({name: {not: {like: 'j*e'}}});
```

## Number

```javascript
class Foo extends Model {
  static schema = {score: type(Number)};
}

Foo.find({score: 0});
Foo.find({score: {not: 0});
Foo.find({score: {below: 0}});
Foo.find({score: {above: 0});
Foo.find({score: {above: 0, below: 100});
```

## Boolean

```javascript
class Foo extends Model {
  static schema = {active: type(Boolean)};
}

Foo.find({active: true});
```

## Date

```javascript
class Foo extends Model {
  static schema = {date: type(Date)};
}

Foo.find({date: new Date()});
Foo.find({date: {not: new Date()}});
Foo.find({date: 'date string'});
Foo.find({date: {not: 'date string'}});
Foo.find({date: {before: new Date()}});
Foo.find({date: {after: new Date()}});
Foo.find({date: {before: Date, after: Date}});
```

# AND OR

```javascript
Foo.find([{foo: 1, bar: 1}, {bar: 2}]); // where (foo=1 and bar=2) or bar=2
```

# CRUD

All databases expose the same CRUD operations:

- count
- findMany
- findOne
- insertMany
- insertOne
- removeMany
- removeOne
- updateMany
- updateOne

## findOne / findMany

```js
const results = await Model.findOne(
  {
    foo: true,
    number: {above: 10},
    user: await User.findOne()
  }
);
```

## Results

```javascript
class Team extends Model {
  static schema = {
    color: type(String).required().unique(),
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
maeva.updateMany(users, {score: {above: 0}}, {score: {add: 10}}, {projection: {limit: 10}});
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
import mysql from '@maeva/mysql';
import mongodb from '@maeva/mongodb';
import connect from 'maeva/connect';
import findOne from 'maeva/findOne';

const mysqlConnection = connect(mysql());
const mongodbConnection = connect(mongodb());

const userMySQL = findOne(users, {}, {connection: mysqlConnection});
```

# Hooks

You can pass an array of promises before and after the following operations:

```js
const model = {
  name: 'users',
  options: {
    will: {
      insert:
    }
  }
}
```
