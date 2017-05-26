findOne()
===

Find a single document by its id in collection.

# Usage

```javascript
const model = data.model('foo', {name: String});

// Find first document
await data.findOne(model);

// Find nth document
await data.findOne(model, 50);

// Find document by query
const joe = await data.insertOne(model, {name: 'Joe'});
await data.findOne(model, {name: 'Joe'});

// Find by id
joe = await data.findOne(model, joe);
```

# Arguments

- string

# Return

Promise<[DataDocument](../definitions/DataDocument)>

# Notes

## Find by id

Since `id` field changes from a vendor to another, it is left to the connector's discretion to deal with ids.

For example, imagine such SQL table:

+ id + name +
+----+------+
+ 1 + joe

If you do

```SQL
SELECT * FROM `table`
```

you get `{id: 1, name: 'joe'}`, but in maeva **you only get `{name: 'joe'}`**
