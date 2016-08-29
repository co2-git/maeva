maeva
===

JS models. Database agnostic.

# Usage

Use `maeva` to define a model.

```js
// User.js

import {Model} from 'maeva';

class User extends Model {
  static username = String;
}

```

Then use a maeva driver to plug into a database.

```js
// index.js

import mysql from 'maeva-mysql';

maeva.connect(mysql());

User.insert({username: 'foo'});
```

You could eventually use more than one database for the same model simultaneously:

```js
import mysql from 'maeva-mysql';
import mongodb from 'maeva-mongodb';
const mysqlConnection = maeva.connect(mysql);
const mongodbConnection = mongodb.connect(mongodb);
User
  .conn(mysqlConnection, mongodbConnection)
  .insert({username: 'foo'});
```
