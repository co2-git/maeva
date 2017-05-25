like()
===

Look for a value which is a string and is like another string.

# Usage

```javascript
const model = data.model('foo', {name: String});
await data.insertMany(model, [{name: 'Joe'}, {name: 'Jessica'}]);
await data.findMany(model, {name: like('J*')}); // returns [{name: 'Joe'}, {name: 'Jessica'}]
```

# Arguments

- string

# Return

[DataValue](../definitions/DataValue)<'like', string>
