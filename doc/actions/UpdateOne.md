updateOne()
===

Find a single document by its id in collection.

# Usage

```javascript
const model = data.model('foo', {score: Number});

// Update first document
await data.updateOne(model, {}, {score: 100});

// Update nth document
await data.updateOne(model, {}, {score: 100}, 50);

// Use a setter (view below for list of updaters)
await data.updateOne(model, {}, {score: data.sum(100)});
```

# Arguments

- string

# Return

Promise<[DataDocument](../definitions/DataDocument)>

# Notes

## Update by id

View [Ids](../guides/Ids.md) for more information.

## Updaters

[List of updaters](../updaters)
