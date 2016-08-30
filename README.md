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
import {Model, Type} from 'maeva';

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
import {Model, Type} from 'maeva';

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
