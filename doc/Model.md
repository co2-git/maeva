Mavea - Model
===

Model holds the structure definition for your data. It looks like this:

```javascript
{
  defaults?: {
    [fieldName: string]: Function | any
  },
  fields: {
    [fieldName: string]: Function | Type | Model | Object,
  },
  name: string,
  required?: string[],
  validate?: {
    [fieldName: string]: Function | RegExp
  },
}
```

For example, this is how you could model the following data:

```javascript
import * as data from 'maeva';

// Data
const data = {foo: true, bar: 2};

// Model
const dataModel = data.model({
  name: 'data',
  fields: {
    foo: Boolean,
    bar: Number,
  },
});
```

# Name

`name` is a required field. It matches the collection/table name.

Here's a MySQL example:

```javascript
// Data
const playerModel = data.model({
  name: 'players',
  fields: {
    name: String,
  },
});

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
data.model({
  name: 'players',
  fields: {
    dateOfBirth: data.type.date,
    isCaptain: data.type.boolean,
    name: data.type.string,
    score: data.type.number,
  }
})
```

For faster coding, you can also write the following like this:

```javascript
data.model({
  name: 'players',
  fields: {
    dateOfBirth: Date,
    isCaptain: Boolean,
    name: String,
    score: Number,
  }
})
```

## Advanced types

The following advanced types are also made available to you via `data.type`

### Any

Value can be of any type.

```javascript
data.model({
  name: 'data',
  fields: {value: data.type.any}
})
```

### Array

Value can be arrays:

```javascript
data.model({
  name: 'data',
  fields: {value: data.type.array(Number)}
})
```

### Custom

You can create a custom type. View [Type](./Type.md) for more information on custom types.

```javascript
const validateEmail = (email) => /^https?/.test(email);

data.model({
  name: 'data',
  fields: {
    email: data.type({validate: validateEmail})
  }
})
```

### Enum

Value can be restricted to pure values:

```javascript
data.model({
  name: 'data',
  fields: {
    lang: data.type.values('en', 'es', 'fr'),
  }
})
```

### Links

Value can be links to other data models:

```javascript
data.model({
  name: 'players',
  fields: {
    team: data.model({
      name: 'teams',
      field: {name: String}
    })
  },
})
```

### Mixed

Value can be mixed:

```javascript
data.model({
  name: 'data',
  fields: {value: data.type.mixed(String, Number)}
})
```

### Object

Value can be objects:

```javascript
data.model({
  name: 'data',
  fields: {
    location: data.type.shape({latitude: Number, longitude: Number}),
  }
})
```

### Tuples

Value can be tuples:

```javascript
data.model({
  name: 'data',
  fields: {value: data.type.tuple(String, Number)}
})
```

# Required

A collection of field names that are required upon insertion.

```javascript
data.model({
  name: 'users',
  fields: {email: String, password: String},
  required: ['email', 'password'],
})
```

# Default

You can set default values. If default value is a function, it will be executed.

```javascript
data.model({
  name: 'players',
  fields: {score: Number},
  default: {score: 0}, // default value fore "score" is 0
});

// With functions
data.model({
  name: 'players',
  fields: {joined: Date},
  default: {joined: () => new Date()}, // default value fore "joined" is current date
})
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
