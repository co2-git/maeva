Maeva / Type / Object
===

Declare a shape.

# Model

```js
import * as data from 'mavea';

const collection = data.model('data', {
  object: data.type.shape({foo: Boolean, bar: Number}),
});
```

# Insert

```javascript
import * as data from 'maeva';

const object = {foo: true, bar: 2};

data.insertOne(collection, {object});
```

# Find

## Find by deep equal

```javascript
import * as data from 'maeva';

data.findOne(collection, {object});
```

## Find by not deep equal

```javascript
import * as data from 'maeva';

data.findOne(collection, {object: data.where.not(object)});
```

## Find by key

```javascript
import * as data from 'maeva';

data.findOne(collection, {'object.bar': 2});
```

## Find by key not

```javascript
import * as data from 'maeva';

data.findOne(collection, {'object.bar': data.where.not(2)});
```
