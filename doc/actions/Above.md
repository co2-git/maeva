above()
===

Look for a value which is a number and is above another number.

# Usage

```javascript
const model = data.model('foo', {bar: Number});
await data.insertMany(model, [{bar: 10}, {bar: 20}, {bar: 30}]);
await data.findMany(model, {bar: above(10)}); // returns [{bar: 20}, {bar: 30}]
```

# Arguments

## number

# Return

[DataValue](../definitions/DataValue)
