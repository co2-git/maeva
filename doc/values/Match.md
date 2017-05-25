match()
===

Look for a value which is a string and matches another string.

# Usage

```javascript
const model = data.model('foo', {name: String});
await data.insertMany(model, [{name: 'Joe'}, {name: 'Jessica'}]);
await data.findMany(model, {name: data.match('o')}); // returns [{name: 'Joe'}]
await data.findMany(model, {name: data.match(/^J/)}); // returns [{name: 'Joe'}, {name: 'Jessica'}]
```

# Arguments

- string | RegExp

# Return

[DataValue](../definitions/DataValue)<'match', string>
