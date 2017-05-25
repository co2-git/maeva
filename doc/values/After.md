after()
===

Look for a value which is a date and is after another date.

# Usage

```javascript
const users = data.model('users', {created: Date}, {default: {created: new Date()}});
await data.insertOne(users, {});
await data.findMany(users, {created: after(new Date())}); // returns null
```

# Arguments

- Date

# Return

[DataValue](../definitions/DataValue)<'after', number>
