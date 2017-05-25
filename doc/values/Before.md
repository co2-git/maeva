before()
===

Look for a value which is a date and is before another date.

# Usage

```javascript
const users = data.model(
  'users',
  {name: String, created: Date},
  {default: {created: new Date()}}
);
await data.insertOne(users, {name: 'foo'});
await data.findMany(users, {created: before(new Date())}); // returns {name: foo, created: Date}
```

# Arguments

- Date

# Return

[DataValue](../definitions/DataValue)<'before', number>
