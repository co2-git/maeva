maeva
===

JS models. Database agnostic.

# Usage

Use `maeva` to define a model.

```js
import {is, Model} from 'maeva';

class User extends Model {
  static schema = {
    name: is(String),
    active: is(Boolean),
    score: is(Number),
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
    name: is(String),
    awards: is(Number),
  };
}

class Player extends Model {
  static schema = {
    name: is(String),
    score: is(Number),
    isCaptain: is(Boolean),
    team: is(Team),
  };
}

const player = await Player.findById(id);

if (player.isCaptain) {
  await Promise.all([
    player
      .increment('score', 100)
      .save(),

    player.team
      .increment('awards', 10)
      .save(),
  ])
}
```

## Objects (embedded documents)

We use key notations (with dots).

```js
{
  temperature: is({
    day: is(Number),
    night: is(Number),
    unit: is('Celsius', 'Fahrenheit', 'Kelvin')
  })
}
```

## Arrays

Enclose type in array brackets to declare an array:

```js
{
  numbers: is.many(Number),
}
```

## Tuples

An array with more than one type is seen as a tuple:

```js
{
  items: is.many(Number, String, is.many(Boolean)),
}
```

## Mixed

You can declare mixed types such as:

```js
{
  mixed: is.either(Number, String),
}
```

## Array of mixed

```js
{
  mixed: is.many(is.either(Number, String)),
}
```

## Any

Accept any type

```js
{
  any: is.anything,
}
```

## Enum

```js
{
  greeting: is.eitheir('hello', 'goodbye'),
}
```

## Circular dependencies

In case of cicular dependencies, you can use a getter:

```js
import Bar from './Bar'; // and Bar also imports Foo

Foo {
  // use a getter in order not to get a null value
  get bar = () => Is(Bar),
}
```

## Required

```js
{
  email: is(String).required,
}
```

## Default

```js
{
  created: is(Date).default(Date.now),
  score: is(Number).default(100),
}
```

## Validate

```js
{
  url: is(String).validate(/^https:/),
  status: is(Number).validate((status) => status === 200)
}
```

# Indexes

Indexes might vary from a database to another but expect standard indexes to be exposed:

```js
{
  field: is(Number).index(),
  uniqueField: is(Number).unique()
}
```

## Compound indexes

```js
{
  number: is(Number).unique('team'),
  team: is(Team)
}
```

# CRUD

All database expose the same CRUD operations:

- find
- findOne
- findById
- findRandomOne
- findRandom
- count
- update
- updateOne
- updateById
- remove
- removeOne
- removeById
- insert

## find

```js
const results = await Model.find(
  {
    foo: true,
    number: {$gt: 0}
  },
  {limit: 10, reverse: true}
);
```

You can use modifiers via the `$` prefix.

## projection

You can use the following projection:

- limit (number)
- skip (number)
- sort (view below)
- reverse (boolean, to reverse order)

## update

```js
Model.update({number: {$gt: 0}}, {number: 0}, {limit: 10});
```

## find with function

```javascript
Model.find((collection) => collection.foo === 2, {limit: 10});
```

# Singleton

```js
const foo = new Foo({bar: 1});
foo.set({barz: true}).save();
```

# Queries

You can pass meta-queries:

```js
Model.find({foo: {$not: true});
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

- insert
- update
- remove

*Note* a failing promise will break the sequence.

```js
class Foo extends Model {
  // will be called before insertion. If one of promises failed, document will not be inserted
  static inserting(doc, model) {
    return [
      new Promise((resolve, reject) => { /* ... */ }),
    ];
  }
  // will be called after insertion. If one of promises failed, insertion is not rollbacked but maintained
  static inserting(doc) {
    return [
      new Promise((resolve, reject) => { /* ... */ }),
    ];
  }
  // will be called before updating. If one of promises failed, document will not be updated
  static updating(doc) {
    return [
      new Promise((resolve, reject) => { /* ... */ }),
    ];
  }
  // will be called after updating. If one of promises failed, update is not rollbacked but maintained
  static updated(doc) {
    return [
      new Promise((resolve, reject) => { /* ... */ }),
    ];
  }
  // will be called before removing. If one of promises failed, document will not be removed
  static removing(doc) {
    return [
      new Promise((resolve, reject) => { /* ... */ }),
    ];
  }
  // will be called after removal. If one of promises failed, removal is not rollbacked but maintained
  static removed(doc) {
    return [
      new Promise((resolve, reject) => { /* ... */ }),
    ];
  }
}
```
