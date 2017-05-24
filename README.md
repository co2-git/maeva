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

## above => `DataValue`

Look for a value which is a number and is above another number.

`function above<N> (N: number): DataValue<'above', N>`

```javascript
import {above, findOne, limit} from 'maeva';
const players = model('players', {score: Number});
await findOne(players, {score: above(10)});
```

## after => `DataValue`

Look for a value which is a date and is after another date.

`function after<D> (D: Date): DataValue<'after', D>`

```javascript
import {after, findOne, model} from 'maeva';
const players = model('players', {created: Date});
await findOne(players, {created: after(new Date())});
```

## any => `DataType`

A type that accepts anything.

`function any(): DataType<void, void>`

```javascript
import {any, model} from 'maeva';
model('foo', {value: any});
```

## array => `DataType`

A type that accepts arrays.

`function array<T> (T: Function | DataType): DataType<Function, Function>`

```javascript
import {array, model} from 'maeva';
model('foo', {numbers: array(Number)});
```

## before => `DataValue`

Look for a value which is a date and is before another date.

`function before<D> (D: Date): DataValue<'before', D>`

```javascript
import {before, findOne, model} from 'maeva';
const players = model('players', {created: Date});
await findOne(players, {before: after(new Date())});
```

## below => `DataValue`

Look for a value which is a date and is after another date.

`function below<D> (D: Date): DataValue<'before', D>`

```javascript
import {below, findOne, limit} from 'maeva';
const players = model('players', {score: Number});
await findOne(players, {score: below(10)});
```

## connect => `DataConnection`

Create a new connection and connect to its connector.

`function connect<C> (C: DataConnector): DataConnection<C>`

```javascript
import {connect} from 'maeva';
const connector = new DataConnector({...});
const connection = connect(connector);
```

## count => `await number`

Count documents in collection.

`function count<M, Q, O> (M: DataModel, Q: ?DataQuery, O: ?DataOptions): Promise<number>`

```javascript
import {above, count, model} from 'maeva';
const players = model('players', {score: Number});
await count(players, {score: above(100)});
```


- `DataType` [date](doc/actions/Count.md)
- `DataConnection` [disconnect](doc/actions/Count.md)
- `await DataDocument[]` [findMany](doc/actions/Count.md)
- `await DataDocument` [findOne](doc/actions/Count.md)
- `await DataDocument[]` [insertMany](doc/actions/Count.md)
- `await DataDocument` [insertOne](doc/actions/Count.md)
- `DataValue` [like](doc/actions/Count.md)
- `DataProjection` [limit](doc/actions/Count.md)
- `DataValue` [match](doc/actions/Count.md)
- `DataType` [mixed](doc/actions/Count.md)
- `DataModel` [model](doc/actions/Count.md)
- `DataConnection` [reconnect](doc/actions/Count.md)
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
