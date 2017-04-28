maeva
===

JS models. Database agnostic.

# Usage

Use `maeva` to define a model.

```js
import {model} from 'maeva';
import mysql from 'maeva-mysql';

const users = model({foo: String});

# Then use a maeva driver to plug into a database.

maeva.connect(mysql());

const foo = 'abc';

await maeva.insertOne(users, {foo});
await maeva.findOne(users, {foo});
await maeva.updateOne(users, {foo}, {foo: 'b'});
await maeva.removeOne(users, {foo});

const user = await maeva.findOne(users);
if (user && user.score < 100) {
  maeva.updateOne(user, {score: 100});
}
```

- [Schema]
- [Types]
  - [String]
  - [Number]
  - [Boolean]
  - [Date]
  - [Object](doc/types/Object.md)
- [Relations](doc/Relations.md)
- []

## Tuples

An array with more than one type is seen as a tuple:

```js
{
  items: type.tuple(String, Number),
}
```

## Mixed

You can declare mixed types such as:

```js
{
  mixed: type.mixed(
    Boolean,
    type.object({
      names: type.array(String)
    })
  ),
}
```

## Array of mixed

```js
{
  mixed: type.array(type.mixed(Number, String)),
}
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
