Ids
===

Since `id` field changes from a vendor to another, it is left to the connector's discretion to deal with ids.

For example, imagine such SQL table:

```
+ id + name +
+----+------+
+ 1 + joe
```

If you do

```SQL
SELECT * FROM `table`
```

you get `{id: 1, name: 'joe'}`, but in maeva **you only get `{name: 'joe'}`**. maeva attaches a non-enumerable property called `[[maevaMetaData]]` which contains such id. You could retrieve like this:

```javascript
const joe = await data.findOne(users);
const {id} = data.meta(joe);
```

You usually don't need the id at all on your side. maeva handles retrieving meta data in a smart way:

```javascript
// get a data document
await data.findOne(users, joe);
await data.findMany(users, [joe]);

await data.updateOne(users, joe, {field: 'new value'});
await data.updateMany(users, [joe], {field: 'new value'});

await data.removeOne(users, joe);
await data.removeMany(users, joe);
```

If ever you have just the id, pass it as is:

```javascript
const id = 12345;
await data.findOne(users, id); // connector will use id to find user
await data.findMany(users, [id]);
```

# Meta

## id

The id value (`any`) of the id.
