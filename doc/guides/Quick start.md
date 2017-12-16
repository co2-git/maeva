Quick start
===

# Install

```js
import * as data from '@maeva/data';
```

# Create models

```js
const authorsModel = data.model('authors', {name: String});
```

# Connect to a connector

```js
import mysql from '@maeva/mysql';

data.connect(mysql('mysql://mysqlserver.com'));
```

# Fire queries

```js
const authors = await data.findMany(authorsModel);
```

# Listen to server events

```js
data.onInsert((modelName, documents) => {
  console.log('New documents inserted', {modelName, documents});
});
```

# Client and servers

If you want to perform queries on a client app, then you need to connect to a sockets or a HTTP connector.
