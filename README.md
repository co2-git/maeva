maeva
===

JS models. Database agnostic.

# Usage

Use `maeva` to define a model.

```js
import {Model} from 'maeva';

class User extends Model {
  static schema = {
    name: String,
    active: Boolean,
    score: Number,
  };
}
```

Then use a maeva driver to plug into a database.

```js
import mysql from 'maeva-mysql';

maeva.connect(mysql());

User.insert({name: 'lambda', active: true, score: 100});
```

# Supported drivers

- [mongodb](npmjs.com/package/maeva-mongodb)

# Deep into models

## Type

You can set any of these native types as your field type:

- String
- Boolean
- Number
- Date

## Objects

Objects are seen as embedded documents and are declared as `Schema`:

```js
import {Model, Schema} from 'maeva';

class Foo extends Model {
  static schema = {
    subdocument: new Schema({foo: String}),
  };
}

new Foo({subdocument: {foo: 'hello'}});
```

## Arrays

Enclose type in array brackets to declare an array:

```js
import {Model} from 'maeva';

class Foo extends Model {
  static schema = {
    numbers: [Number],
  };
}

new Foo({numbers: [1, 2, 3]});
```

## Tuples

An array with more than one type is seen as a tuple:

```js
import {Model} from 'maeva';

class Foo extends Model {
  static schema = {
    tuple: [Number, String],
  };
}

new Foo({tuple: [1, 'hello']});
```

## Mixed

You can declare mixed types such as:

```js
import {Model, Type} from 'maeva';

class Foo extends Model {
  static schema = {
    mixed: Type.Mixed(Number, String),
  };
}

new Foo({mixed: 0});
new Foo({mixed: 'hello'});
```

## Any

Accept any type

```js
import {Model, Type} from 'maeva';

class Foo extends Model {
  static schema = {
    any: Type.any,
  };
}
```

# Link models

You can associate a type to another model.

```js
class Bar extends Model {}

class Foo extends Model {
  static schema = {
    bar: Bar
  };
}
```

## Circular dependencies

In case of cicular dependencies, you can use a getter:

```js
import Bar from './Bar'; // and Bar also imports Foo

class Foo extends Model {
  static schema = {
    get bar() { // use a getter to not get a null value
      return Bar;
    }
  };
}
```

# Other options

```js
class Foo extends Model {
  static schema = {
    field: {
      type: String,
      required: true, // this field is required upon insertion
      default: 'hello', // default value. You can pass a function to be called
      validate: (value) => /abc/.test(value), // a boolean function that will reject false results on any write operations
    },
  };
}
```

# Indexes

Indexes might vary from a database to another but expect standard indexes to be exposed:

```js
class Foo extends Model {
  static schema = {
    field: {
      index: true, // index this field
      unique: true, // mark this field as unique
    },
  };
}
```

## Compound indexes

```js
class Foo extends Model {
  static schema = {
    field1: {
      index: ['field2'], // index this field with field2
      unique: ['field3'], // mark this field as unique with field3
    },
    field2: Boolean,
    field3: String,
  };
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
Model.find({foo: true, number: {$gt: 0}}, {limit: 10, reverse: true});
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
