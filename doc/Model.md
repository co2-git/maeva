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
  validate = /^http/.test;
}

model({
  name: 'data',
  fields: {url: URLType}
})
```

### Links

Value can be links to other models:

```javascript
model({
  name: 'players',
  fields: {
    team: {
      name: 'teams',
      field: {name: String}
    }
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
    location: Type.embed({latitude: Number, longitude: Number}),
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