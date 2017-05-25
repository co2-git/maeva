above()
===

Look for a value which is a number and is above another number.

# Usage

```javascript
// @example
await data.findOne(data.model('foo', {bar: Number}), {
  bar: data.above(10)
});
```

# Arguments

## number

# Return

[DataValue](../definitions/DataValue);
