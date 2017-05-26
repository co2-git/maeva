Hooks
===

The following definitions have emitters:

- `DataConnection`
- `DataConnector`
- `DataModel`

# DataModel

Data models emit before each write and after each write.

Events:

- `inserted`
- `inserting`
- `removed`
- `removing`
- `updated`
- `updating`

```javascript
const model = data.model('model', {foo: data.any});
model.insertOne({foo: 1});
data.onAfter('insert', model, ({foo}) => {
  console.log(foo); // 1
});
```

A model will emit the following events:


```javascript
// Encrypt password before insertion
const userData = data.model('users', {name: String, password: String});
data.on('willInsert', userData, (user) => new Promise(async (resolve, reject) => {
  let password;
  try {
    password = await encrypt(user.password);
   } catch (error) { reject(error) } finally {
   resolve({
    ...user,
    password,
   });
  }
}));
```
