maeva
===

JS models. Database agnostic.

# Usage

```js
import * as data from 'maeva';
import mongodb from 'maeva-mongodb';

// Define a model
const players = data.model('players', {
  name: String,
  score: Number,
  isCaptain: Boolean
});

// Use a data connector to connect to a database server
const connector = mongodb('mongodb://localhost');
const connection = data.connect(connector);

// Now you can fire requests to the database server
await data.insertOne(players, {
  name: 'Joe',
  score: 100,
  isCaptain: true
});

// Find players
await data.findMany(players, {
  isCaptain: true,
  name: /jo/,
  score: data.above(0)
});
```

# Connectors

## Most popular databases

- [maeva-firebase](https://npmjs.org/packages/maeva-firebase) FireBase connector
- [maeva-mongodb](https://npmjs.org/packages/maeva-mongodb) MongoDB connector
- [maeva-mysql](https://npmjs.org/packages/maeva-mysql) MySQL connector
- [maeva-postgresql](https://npmjs.org/packages/maeva-postgresql) PostGreSQL connector

## JavaScript databases

- [maeva-json](https://npmjs.org/packages/maeva-json) A json database that lives in memory - with an option to persist data in storage

## Client APIs

- [maeva-http](https://npmjs.org/packages/maeva-http) A built-in HTTP API you can plug to any maeva connector
- [maeva-sockets](https://npmjs.org/packages/maeva-sockets) A built-in Web Socket API you can plug to any maeva connector

# Docs

- [Guide](doc/guides/)
  - [Quick start](doc/guides/Quick%20start.md)
  - [Core concepts and design principles](doc/guides/Core%20concepts%20and%20design%20principles.md)
  - [Model](doc/guides/Model.md)
  - [Hooks](doc/guides/Hooks.md)
  - [Connect](doc/guides/Connect.md)
  - [Create your own connector](doc/guides/Create%20your%20own%20connector.md)
  - [Ids](doc/guides/Ids.md)
  - [Coding styles](doc/guides/Coding%20styles.md)
  - [Back and front ends integrations](doc/guides/Back%20and%20front%20ends%20integrations.md)
- API
  - [Actions](./doc/actions)
    - [count](./doc/actions/Count.md)
    - [findById](./doc/actions/findById.md)
    - [findByIds](./doc/actions/findByIds.md)
    - [findMany](./doc/actions/FindMany.md)
    - [findOne](./doc/actions/FindOne.md)
    - [insertMany](./doc/actions/InsertMany.md)
    - [insertOne](./doc/actions/InsertOne.md)
    - [removeById](./doc/actions/removeById.md)
    - [removeByIds](./doc/actions/removeByIds.md)
    - [removeMany](./doc/actions/RemoveMany.md)
    - [removeOne](./doc/actions/RemoveOne.md)
    - [updateById](./doc/actions/updateById.md)
    - [updateByIds](./doc/actions/updateByIds.md)
    - [updateMany](./doc/actions/UpdateMany.md)
    - [updateOne](./doc/actions/UpdateOne.md)
  - [Connections](./doc/connections)
    - [connect](./doc/connections/Connect.md)
    - [connected](./doc/connections/Connected.md)
    - [disconnect](./doc/connections/Disconnect.md)
    - [disconnected](./doc/connections/Disconnected.md)
    - [reconnect](./doc/connections/Reconnect.md)
  - Models
    - [model](./doc/guides/Model.md)
  - [Types](./doc/types)
    - [any](./doc/types/Any.md)
    - [array](./doc/types/Array.md)
    - [link](./doc/types/Link.md)
    - [mixed](./doc/types/Mixed.md)
    - [shape](./doc/types/Shape.md)
    - [tuple](./doc/types/Tuple.md)
    - [type](./doc/types/Type.md)
  - [Updaters](./doc/updaters)
    - [divide](./doc/updaters/Divide.md)
    - [subtract](./doc/updaters/Subtract.md)
    - [sum](./doc/updaters/Sum.md)
    - [times](./doc/updaters/Times.md)
  - [Values](./doc/values)
    - [above](./doc/values/Above.md)
    - [after](./doc/values/After.md)
    - [before](./doc/values/Before.md)
    - [below](./doc/values/Below.md)
    - [like](./doc/values/Like.md)
    - [match](./doc/values/Match.md)
    - [not](./doc/values/Not.md)
