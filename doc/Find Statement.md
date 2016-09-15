maeva - find statement
===

You can easily declare a find statement via an object that is a pair of fields and values. Use meta fields prefixed by `$` to declare specific find behavior.

# A simple query

```javascript
Model.find({foo: 1}); // WHERE FOO = 1
```

# Values are automatically converted

Field types will automatically convert values to their right type:

```javascript
class Foo extends Model {
  static schema = {foo: Number};
}

Model.find({foo: '1'}); // '1' will be converted to 1
```

# NOT

You can specify not queries:

```javascript
Model.find({foo: {$not: 1}}); // WHERE FOO != 1
```

You can also decide to have a not block:

```javascript
Model.find({$not: {foo: 1, bar: 2}}); // WHERE FOO != 1 AND BAR != 2
```

Or a not either:

```javascript
Model.find({$not: [{foo: 1}, {bar: 2}]}); // WHERE FOO != 1 OR BAR != 2
```

# OR

Simply use array to declare an either statement:

```javascript
// on a field
Model.find({foo: [1, 2]}); // WHERE FOO = 1 OR FOO = 2

// compound or (notice the find statement is an array now)
Model.find([{foo: 1, bar: 4}, {foo: 2, bar: -1}]);
// WHERE (FOO = 1 AND BAR = 4) OR (FOO = 2 AND BAR = -1)
```

# Value comparison

These comparisons work with both numbers and dates:

```javascript
class Foo extends Model {
  static schema = {
    number: Number,
    date: Date,
  };
}

// Lesser than
Model.find({number: {$lt: 10}, date: {$lt: new Date()}});

// Lesser than or equal
Model.find({number: {$lte: 10}, date: {$lte: new Date()}});

// Greater than
Model.find({number: {$gt: 10}, date: {$gt: new Date()}});

// Greater than
Model.find({number: {$gte: 10}, date: {$gte: new Date()}});
```

# Match

You can use regex for strings:

```javascript
Model.find({text: /^\d/});
```

# Array

Perform find search with `$has`:

```javascript
Model.insert({foo: [1, 2, 3]});

// WHERE FOO CONTAINS 1
Model.find({foo: {$has: 1}});

// WHERE FOO CONTAINS 1 AND 2
Model.find({foo: {$has: [1, 2]}});

// WHERE FOO CONTAINS 1 OR 2
Model.find({foo: {$has: {$either: [1, 2]}}});

// WHERE FOO CONTAINS ONLY 1,2,3
Model.find({foo: {$has: {$exactly: [1, 2, 3]}}});

// WHERE FOO DOES NOT CONTAIN 1
Model.find({foo: {$has: {$not: 1}}});

// WHERE FOO DOES NOT CONTAIN NEITHER 1 NOR 2
Model.find({foo: {$has: {$neither: [1, 2]}}});
```
