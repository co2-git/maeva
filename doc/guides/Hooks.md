Hooks
===

```javascript
const users = data.model('users', {password: String}, {
  before: {
    insert: (user) => new Promise(async (resolve, reject) => {
      let password;
      try {
        password = await encrypt(user.password);
      } catch (error) {
        reject(error);
      } finally {
        resolve({
          ...user,
          password,
        });
      }
    })
  },
  after: {
    remove: (user) => console.log('bye', {user})
  }
});
```

# Events

- insert
- remove
- update

# Before

A `before` hook will receive as an argument the object to be inserted, removed or updated. It should return a promise with a transformed object.

```javascript
const model = data.model('model', {syncInfo: String, asyncInfo: String}, {
  before: {
    insert: (document) => new Promise(async (resolve, reject) => {
      let asyncInfo;
      try {
        asyncInfo = await getAsyncInfo();
      } catch (error) {
        reject(error);
      } finally {
        resolve({
          ...document,
          asyncInfo,
        });
      }
    })
  },
});

await data.insertOne(model, {syncInfo: 'abc'}); // {syncInfo: 'abc', asyncInfo: 'something'}
```
