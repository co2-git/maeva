above()
===

Look for a value which is a number and is above another number.

# Usage

```javascript
const bars = data.model('bars', {bar: Number});
await data.insertMany(bars, [{bar: 10}, {bar: 20}, {bar: 30}]);
await data.findMany(bars, {bar: above(10)}); // returns [{bar: 20}, {bar: 30}]
```

# Arguments

- number

# Return

[DataValue](../definitions/DataValue)<'above', number>
