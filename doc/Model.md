Mavea - Model
===

Model holds the structure definition for your data. It looks like this:

```javascript
{
  defaults?: {[fieldName: string]: Function | any},
  fields: {[fieldName: string]: MaevaType},
  name: string,
  required?: string[],
  validate?: {[fieldName: string]: Function | RegExp},
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
