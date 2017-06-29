Mavea - Model
===

Model holds the structure definition for your data. Mainly this means setting a type per field. An example of a type could be a string or a number. These are the other options to model your data:

- **[name](#maeva-name)**
- **[fields](#fields)**
- [default](#default)
- [required](#required)
- [validate](#validate)
- [hooks](#hooks)
    - [before](#before)
        - [insert](#insert)
        - [remove](#remove)
        - [update](#update)
    - [after](#after)
        - [insert](#insert)
        - [remove](#remove)
        - [update](#update)

# Usage

```javascript
// Data
const rawData = {foo: true, bar: 2};

// Model
const dataModel = data.model('rawData', {foo: Boolean, bar: Number});
```

# <a id="maeva-name"></a>Name

`name` is required. It points to a collection/table name.

Here's a MySQL example:

```javascript
// Data
const playerModel = data.model('players', {name: String});

data.connect(mysql('mysql://localhost'));

await data.findOne(playerModel, {name: 'Joe'});

// SELECT * FROM `players` WHERE `name`="Joe";
```

# <a id="fields"></a>Fields

`fields` is a required field. It is an object which keys are field names and values its type.

Value must be an instance of `DataType` or a native type.

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

The following advanced types are also made available to you:

- [any](../types/Any.md)
- [array](../types/Array.md)
- [mixed](../types/Mixed.md)
- [shape](../types/Shape.md)
- [tuple](../types/Tuple.md)
- [type](../types/Type.md)

# <a id="required"></a>Required

A collection of field names that are required upon insertion.

```javascript
data.model('users', {
  email: String,
  password: String,
}, {required: ['email', 'password']})
```

# <a id="default"></a>Default

You can set default values. If default value is a function, it will be executed.

```javascript
data.model('players', {score: Number}, [], {score: 0});
data.model('players', {joined: Date}, [], {joined: () => new Date()});
```

# <a id="validate"></a>Validation

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

# Hooks (before and after)

See [Hooks](./Hooks.md)
