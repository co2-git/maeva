```js
import * as data from 'maeva';

const Email = data.type(
  'email',
  String,
  null,
  value => {
    if (!/^.+@.+\..+$/.test(value)) {
      throw new TypeError('Expecting a valid email');
    }
  },
);

const users = data.model('users', {email: Email});

// this will fail
await data.insertOne(users, {email: 'joe'});

// this will work
await data.insertOne(users, {email: 'joe@doe.com'});
```
