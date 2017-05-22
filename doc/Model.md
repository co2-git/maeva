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
import {model} from 'maeva';

// Data
const data = {foo: true, bar: 2};

// Model
const dataModel = model({
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
const playerModel = model({
  name: 'players',
  fields: {
    name: String,
  },
});

await maeva.findOne(playerModel, {name: 'Joe'});

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
model({
  name: 'players',
  fields: {
    name: String,
    score: Number,
    isCaptain: Boolean,
    dateOfBirth: Date,
  }
})
```

## Advanced types

The following advanced types are also made available to you via `Type`

```javascript
import {Type} from 'maeva';
```

### Any

Value can be of any type.

```javascript
model({
  name: 'data',
  fields: {value: Type.any}
})
```

### Array

Value can be arrays:

```javascript
model({
  name: 'data',
  fields: {value: Type.array(Number)}
})
```

### Custom

You can create a custom type. View [Type](./Type.md) for more information on custom types.

```javascript
class URLType extends Type.String {
  validate = ::/^http/.test;
}

model({
  name: 'data',
  fields: {url: URLType}
})
```

### Enum

Value can be restricted to pure values:

```javascript
model({
  name: 'data',
  fields: {lang: Type.values('en', 'es', 'fr')}
})
```

### Links

Value can be links to other models:

```javascript
model({
  name: 'players',
  fields: {
    team: model({
      name: 'teams',
      field: {name: String}
    })
  },
})
```

### Mixed

Value can be mixed:

```javascript
model({
  name: 'data',
  fields: {value: Type.mixed(String, Number)}
})
```

### Object

Value can be objects:

```javascript
model({
  name: 'data',
  fields: {
    location: Type.shape({latitude: Number, longitude: Number}),
  }
})
```

### Tuples

Value can be tuples:

```javascript
model({
  name: 'data',
  fields: {value: Type.tuple(String, Number)}
})
```

# Required

A collection of field names that are required upon insertion.

```javascript
model({
  name: 'users',
  fields: {email: String, password: String},
  required: ['email', 'password'],
})
```

# Default

You can set default values. If default value is a function, it will be executed.

```javascript
model({
  name: 'players',
  fields: {score: Number},
  default: {score: 0}, // default value fore "score" is 0
});

// With functions
model({
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
model({
  name: 'players',
  fields: {email: String},
  validate: {email: /^.+@.+\..+$/}
});

// Using function
model({
  name: 'players',
  fields: {password: String},
  validate: {password: (password) => password.length >= 4 && password.length <= 16},
})
```
