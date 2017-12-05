Core concepts and design principles
===

# Database agnostic

`maeva` is database-agnostic. This means you _should_ be able to run your `maeva` models against any database vendor - provided there is an existing `maeva` connector for that database vendor.

Being database-agnostic has inherent limitations. The most obvious ones are:

- Different `id` or `key` implementation
- Different type acceptance
- Different ways of reading/writing data

# Ids and keys

`maeva` ignores `id`s. Instead, it is the responsibility of the `maeva` connector to implement it.
For example, `mysql` uses a numeric `id` it increments on each row insertion, when `mongodb` will use an object, `ObjectID`.
Actually, even in `mysql`, you could decide not to use an `id`.
A key based database for example will have no `id` - instead it will have unique keys paired to a value.
`maeva` ignores `id`s. It is up to the connector of implementing it.

```js
import * as data from 'maeva';
import mysql from 'maeva-msyql';
import mongodb from 'maeva-mongodb';

const mysqlConn = data.connect(mysql('mysql://localhost'));
const mongoConn = data.connect(mongodb('mongodb://localhost'));

const userModel = data.model(
  'users',
  {email: String}
);

const mysqlUser = await data.insertOne(
  'users',
  {email: 'joe@doe.com'},
  {connection: mysqlConn}
);
// {id: 1, email: "joe@doe.com"}

const mongoUser = await data.insertOne(
  'users',
  {email: 'joe@doe.com'},
  {connection: mongoConn}
);
// {_id: ObjectId("5a24c5f44082213b366f27f6"), email: "joe@doe.com"}
```

Yet, to make it easy on developers, we offer two methods to retrieve a document's id while staying database-agnostic:

```js
data.getDocumentId(mysqlUser); // 1
data.getDocumentId(mongoUser); // ObjectId("5a24c5f44082213b366f27f6")

// You could also retrieve info about id from connector
const mysqlId = data.getId(mysqlConn); // {"name": "id", "type": Number}
const mongoId = data.getId(mongoConn); // {"name": "_id", "type": ObjectId}
```
