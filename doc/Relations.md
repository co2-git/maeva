mavea - Relations
===

How to create relations between models

- [Proof of concept](#proof-of-concept)
- [Cross relations](#cross-relations)
- [Find by relation](#find-by-relation)
- [Update a relation](#update-a-relation)
- [Remove a relation](#remove-a-relation)

# <a id="proof-of-concept"></a>Proof of concept

This is how to relate a model to another.

```javascript
// models/ModelA.js

class ModelA extends Model {
  static schema = {
    name: type(String),
  };
}

// models/ModelB.js

import ModelA from './ModelA';

class ModelB extends Model {
  static schema = {
    modelA: type(ModelA),
  };
}
```

# <a id="cross-relations"></a>Cross relations

If both models relate to each other, use getters to avoid getting undefined relations.

```javascript
// models/ModelA.js
import ModelB from './ModelB';

class ModelA extends Model {
  static schema = {
    name: type(String),
    // use getters to delay execution passed infinite import loops
    get modelB() {
      return type(ModelB);
    },
  };
}

// models/ModelB.js
import ModelA from './ModelA';

class ModelB extends Model {
  static schema = {
    get modelA() {
      return type(ModelA);
    },
  };
}
```

# <a id="find-by-relation"></a>Find by relation

There are two ways to find a model by its relation to another model:

- Find by query
- Find by document

## <a id="find-by-query"></a>Find by query

```javascript
await ModelB.findOne({
  modelA: {name: 'foo'}
});
```

## <a id="find-by-document"></a>Find by document

```javascript
await ModelB.findOne({
  modelA: await ModelA.findOne({name: 'foo'})
});
```

# <a id="update-a-relation"></a>Update a relation

You can update a relation directly from the document:

```javascript
const modelB = await ModelB.findOne({
  modelA: await ModelA.findOne({name: 'foo'})
});

await modelB
  .get('modelA')
  .set({name: 'bar'})
  .save();
```

# <a id="remove-a-relation"></a>Remove a relation

You can remove a relation directly from the document:

```javascript
const modelB = await ModelB.findOne({
  modelA: await ModelA.findOne({name: 'foo'})
});

await modelB
  .get('modelA')
  .remove();
```
