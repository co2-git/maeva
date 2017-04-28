Object type
===

You can use objects to embed documents.

## Object field

```js
class A extends Model {
  static schema = {
    embed: type.object({
      a: type(String),
      b: type(Number),
      c: type.object({
        d: type(Boolean),
      })
    }),
  }
}
```

## Object query

Use dot notation to access nested field.

```javascript
A.find({'embed.a': /foo/});
A.find({'embed.b': {above: 100}});
A.find({'embed.c': {is: Object}});
A.find({'embed.c.d': true});
```
