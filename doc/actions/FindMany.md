findMany()
===

Find a single document by its id in collection.

# Usage

```javascript
const model = data.model('foo', {name: String});

// Find first document
await data.findMany(model);

// Find nth document
await data.findMany(model, 50);

// Find document by query
await data.findMany(model, {name: 'Joe'});
```

# Arguments

- string

# Return

Promise<[DataDocument](../definitions/DataDocument)>

# Notes

## Find by id

View [Ids](../guides/Ids.md) for more information.
