maeva
===

JS models. Database agnostic.

# Usage

```js
import * as data from 'maeva';
import sockets from 'maeva-sockets';

// Define a model
const model = data.model('players', {name: String, score: Number});

// Use a data connector to connect to a database server
const connector = sockets('ws://mysockets.com');
const connection = data.connect(connector);

// Now you can fire requests to the database server
await data.insertOne(players, {name: 'Joe', score: 100});

// Or listen to events
data.inserted(connection, (model, document) => {
  console.log(`inserted #${document.id} into ${model}`);
});
```

# Connectors

- [maeva-http](https://npmjs.org/packages/maeva-http)
- [maeva-mongodb](https://npmjs.org/packages/maeva-mongodb)
- [maeva-mysql](https://npmjs.org/packages/maeva-mysql)
- [maeva-postgresql](https://npmjs.org/packages/maeva-postgresql)
- [maeva-sockets](https://npmjs.org/packages/maeva-sockets)

# Docs

- [Guide](#Guide)
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
    - [findMany](./doc/actions/FindMany.md)
    - [findOne](./doc/actions/FindOne.md)
    - [insertMany](./doc/actions/InsertMany.md)
    - [insertOne](./doc/actions/InsertOne.md)
    - [removeMany](./doc/actions/RemoveMany.md)
    - [removeOne](./doc/actions/RemoveOne.md)
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

- [Definitions](./doc/definitions)
  - [DataConnection](./doc/definitions/DataConnection.md)
  - [DataConnector](./doc/definitions/DataConnector.md)
  - [DataDocument](./doc/definitions/DataDocument.md)
  - [DataType](./doc/definitions/DataType.md)
  - [DataValue](./doc/definitions/DataValue.md)

```javascript
const states = data.model('states', {name: String});
const cities = data.model('cities', {name: String, state: states});
const streets = data.model('streets', {name: String, city: cities, state: states});

const state = await data.insertOne(states, {name: 'CA'});
// {id: 1, name: 'CA'}
const city = await data.insertOne(cities, {name: 'Oakland', state});
// {id: 1, name: 'Oakland', state: 1}
const street = await data.insertOne(streets, {name: '1st Street', city, state});
// {id: 1, name: '1st Street', city: 1, state: 1}

await data.findOne(streets);
// {id: 1, name: '1st Street', city: 1, state: 1}

await data.findOne(streets, {}, {link: ['city', 'state']});
// {id: 1, name: '1st Street', city: {id:1, name: 'Oakland'}, state: {id: 1, name: 'CA'}}

await data.findOne(streets, {}, {link: ['city']});
// {id: 1, name: '1st Street', city: {id:1, name: 'Oakland'}, state: 1}
```
