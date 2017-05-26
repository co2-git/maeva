count()
===

Count documents in collection

# Usage

```javascript
const foo = data.model('foo', {name: String});

// Count all documents
await data.count(foo);

// Count all documents with query
await data.count(foo, {name: data.match('jo', 'i')});
```

# Arguments

- number

# Return

number
