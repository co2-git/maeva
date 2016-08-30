maeva
===

JS models. Database agnostic.

# Usage

Use `maeva` to define a model.

```js
import {Model} from 'maeva';

class User extends Model {
  static schema = {
    name: String,
    active: Boolean,
    score: Number,
  };
}

```

Then use a maeva driver to plug into a database.

```js
import mysql from 'maeva-mysql';

maeva.connect(mysql());

User.insert({name: 'lambda', active: true, score: 100});
```

You could eventually use more than one database for the same model simultaneously:

```js
import mysql from 'maeva-mysql';
import mongodb from 'maeva-mongodb';
const mysqlConnection = maeva.connect(mysql());
const mongodbConnection = mongodb.connect(mongodb());
User
  .conn(mysqlConnection, mongodbConnection)
  .insert({username: 'foo'});
```
