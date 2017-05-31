in()
===

Look for a value in array of values.

# Usage

```javascript
const bars = data.model('bars', {bar: Number});
await data.insertMany(bars, [{bar: 10}, {bar: 20}, {bar: 30}]);
await data.findMany(bars, {bar: data.in(20, 30)}); // returns [{bar: 20}, {bar: 30}]
```

# Arguments

- any

# Return

[DataValue](../definitions/DataValue)<'in', any>
