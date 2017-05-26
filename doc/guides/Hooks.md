Hooks
===

A model will emit the following events:

- `didInsert`
- `didRemove`
- `didUpdate`
- `willInsert`
- `willRemove`
- `willUpdate`

```javascript
// Encrypt password before insertion
const users = data.model('users', {name: String, password: String});
data.on('willInsert', users, (user) => new Promise(async (resolve, reject) => {
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
