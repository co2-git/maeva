Schema
===

Schema are a list of fields. Field have a type attribute and other attributes such as:

- required (whether or not this field is required to be present upon insertion)
- default value
- custom validator
- indexing information

# Types

## Short type notation

Since fields are mainly type declaration, you can assign directly a type to your fields:

``` javascript
import {Schema} from 'maeva';

new Schema({
  username: String,
  age: Number,
});
```

## Long type notations

You can also use the long type notation - useful when you want to declare other attributes than type:

``` javascript
new Schema({
  username: {type: String}
});
```

## Special types declaration

Some types have special syntax:

- Embedded schemas
- Any
- Mixed
- Array
- Tuple

### Embedded schemas

You have three ways of declaring embedded schemas:

```javascript
import {Type, Schema} from 'maeva';

new Schema({
  user: Type.Embed(new Schema({
    name: String,
    email: Type.Embed({
      main: String,
      active: Boolean,
    }),
  })),
});

// For simplicity's sake, we also allow the following syntax:

new Schema({
  user: new Schema({
    name: String,
    email: new Schema({
      main: String,
      active: Boolean,
    }),
  }),
});

// Or this one

new Schema({
  user: Type.Embed({
    name: String,
    email: Type.Embed({
      main: String,
      active: Boolean,
    }),
  }),
});
```

### Any

```javascript
import {Type, Schema} from 'maeva';

new Schema({
  anything: Type.Any,
});
```

### Mixed

```javascript
import {Type, Schema} from 'maeva';

new Schema({
  age: Type.Mixed(Date, Number),
});
```

### Array

You have three ways to declare an array of type:

```javascript
new Schema({
  scores: Array.of(Number),
  // or
  scores: Type.Array(Number),
  // or
  scores: [Number],
});
```

### Tuple

You have three ways to declare a tuple:

```javascript
new Schema({
  field: Type.Tuple(Number, String),
  field: [Number, String],
  field: Array.of(Number, String)
});
```
