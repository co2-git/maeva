below()
===

Look for a value which is a number and is below another number.

# Usage

```javascript
const model = data.model('foo', {bar: Number});
await data.insertMany(model, [{bar: 10}, {bar: 20}, {bar: 30}]);
await data.findMany(model, {bar: below(20)}); // returns [{bar: 10}]
```

# Arguments

- number

# Return

[DataValue](../definitions/DataValue)<'below', number>
