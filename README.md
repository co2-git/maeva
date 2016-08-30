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

# Deep into models

## Type

You can set any of these native types as your field type:

- String
- Boolean
- Number
- Date

## Objects

Objects are seen as embedded documents and are declared via `Shape`:

```js
import {Model, Type} from 'maeva';

class Foo extends Model {
  static schema = {
    subdocument: Type.Shape({foo: String}),
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

# Associate

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
