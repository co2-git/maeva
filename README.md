maeva
===

JS models. Database agnostic.

# Usage

```js
import * as data from 'maeva';
import sockets from 'maeva-sockets';

// Define a data model
const players = data.model(
  'players', // model name
  {name: String, score: Number}, // model fields
 );

// Use a data connector to connect to a database server
const connector = sockets('ws://mysockets.com');
data.connect(connector);

// Insert one player whose name is "Joe" and whose score is 100
await data.insertOne(players, {name: 'Joe', score: 100});

// Find one player whose name is "Joe"
await data.findOne(players, {name: 'Joe'});

// Update one player whose name is "Joe" to have score 0
await data.updateOne(players, {name: 'Joe'}, {score: 0});

// Remove one player whose name is "Joe"
await data.removeOne(players, {name: 'Joe'});
```

# API

- `DataValue` [above](doc/value/Above.md) `number`
```javascript
// @flow
declare function above<N>(N: number): DataValue<number, 'above'>
```
```javascript
// @example
data.findOne(
  data.model('foo', {number: Number}),
  {number: data.above(10)},
);
```
- `DataValue` [after](doc/actions/Count.md)
- `DataValue` [any](doc/actions/Count.md)
- `DataType` [array](doc/actions/Count.md)
- `DataValue` [before](doc/actions/Count.md)
- `DataType` [boolean](doc/actions/Count.md)
- `DataConnection` [connect](doc/actions/Count.md)
- `await number` [count](doc/actions/Count.md)
- `DataType` [date](doc/actions/Count.md)
- `await DataDocument[]` [findMany](doc/actions/Count.md)
- `await DataDocument` [findOne](doc/actions/Count.md)
- `await DataDocument[]` [insertMany](doc/actions/Count.md)
- `await DataDocument` [insertOne](doc/actions/Count.md)
- `DataValue` [like](doc/actions/Count.md)
- `DataProjection` [limit](doc/actions/Count.md)
- `DataValue` [match](doc/actions/Count.md)
- `DataType` [mixed](doc/actions/Count.md)
- `DataModel` [model](doc/actions/Count.md)
- `await void` [removeMany](doc/actions/Count.md)
- `await void` [removeOne](doc/actions/Count.md)
- `DataValue` [shape](doc/actions/Count.md)
- `DataProjection` [skip](doc/actions/Count.md)
- `DataProjection` [sort](doc/actions/Count.md)
- `DataType` [tuple](doc/actions/Count.md)
- `DataType` [type](doc/actions/Count.md)
- `await DataResponse` [updateMany](doc/actions/Count.md)
- `await DataResponse` [updateOne](doc/actions/Count.md)

# Guides

- [Install](doc/Model.md)
- [Model](doc/Type.md)
  - [Field](doc/Type.md)
  - [Hooks](doc/Type.md)
- [Connect](doc/Type.md)
- [Query](doc/Type.md)
