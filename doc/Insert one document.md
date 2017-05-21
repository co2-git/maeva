```javascript
const userFields = {name: String, dateOfBirth: Date};

const userModel = maeva.model({
  name: 'users',
  fields: userFields,
  required: '*',
});

const user = await maeva.insertOne(userModel, {name: 'joe', dateOfBirth: new Date([1990, 0, 15])});
assert(user.name).equal('joe');
```
