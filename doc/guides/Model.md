Mavea - Model
===

Model holds the structure definition for your data. It looks like this:

```javascript
{
  name,
  fields,

}
```

For example, this is how you could model the following data:

```javascript
import * as data from 'maeva';

// Data
const rawData = {foo: true, bar: 2};

// Model
const dataModel = data.model('rawData', {foo: Boolean, bar: Number});
```

# Name

`name` is a required field. It matches the collection/table name.

Here's a MySQL example:

```javascript
// Data
const playerModel = data.model('players', {name: String});

data.connect(mysql('mysql://localhost'));

await data.findOne(playerModel, {name: 'Joe'});

// SELECT * FROM `players` WHERE `name`="Joe";
```

# Fields

`fields` is a required field. It is an object which keys are field names and values its type.

Value must be an instance of `MaevaType` or a native type.

## Native types

You can use one of the following native types:

- `Boolean`
- `Date`
- `Number`
- `String`

```javascript
data.model('players', {
  dateOfBirth: Date,
  isCaptain: Boolean,
  name: String,
  score: Number,
})
```

## Advanced types

The following advanced types are also made available to you via `data.type`

### Any

Value can be of any type.

```javascript
data.model('data', {value: data.any});
```

### Array

Value can be arrays:

```javascript
data.model('data', {value: data.array(Number)})
```

### Custom

You can create a custom type. View [Type](./Type.md) for more information.

```javascript
const validateEmail = (email) => /^https?/.test(email);

data.model('data', {
  email: data.type({validate: validateEmail})
})
```

### Enum

Value can be restricted to pure values:

```javascript
const langs = ['en', 'es', 'fr'];
data.model('data', {
  lang: data.values(...langs)
})
```

### Links

Value can be links to other data models:

```javascript
data.model('players', {
  team: data.model({
    name: 'teams',
    field: {name: String}
  })
})
```

### Mixed

Value can be mixed:

```javascript
data.model('data', {
  stringOrNumber: data.mixed(String, Number)
})
```

### Object

Value can be objects:

```javascript
data.model('users',{
  location: data.shape({latitude: Number, longitude: Number}),
})
```

### Tuples

Value can be tuples:

```javascript
data.model('data', {
  value: data.tuple(String, Number)
})
```

# Required

A collection of field names that are required upon insertion.

```javascript
data.model('users', {
  email: String,
  password: String,
}, {required: ['email', 'password']})
```

# Default

You can set default values. If default value is a function, it will be executed.

```javascript
data.model('players', {score: Number}, [], {score: 0});
data.model('players', {joined: Date}, [], {joined: () => new Date()});
```

# Validation

You can set validations for fields that should return a boolean.

Validations can be either a function or a regular expression (for strings).

```javascript
// Using regular expression
data.model({
  name: 'players',
  fields: {email: String},
  validate: {email: /^.+@.+\..+$/}
});

// Using function
data.model({
  name: 'players',
  fields: {password: String},
  validate: {password: (password) => password.length >= 4 && password.length <= 16},
})
```
