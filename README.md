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

`function count<M, Q, O, C> (M: DataModel, Q: ?DataQuery, O: ?DataOptions, C: ?DataConnection): Promise<number>`

```javascript
import {above, count, model} from 'maeva';
const players = model('players', {score: Number});
await count(players, {score: above(100)});
```

## disconnect => `await void`

Disconnect a collection

`function disconnect<C> (C: DataConnection): Promise<void>`

```javascript
import {disconnect} from 'maeva';
await disconnect(DataConnection);
```

## findById => `await DataDocument`

Find a single document by id in collection.

`function findById<M, I> (
  M: DataModel,
  I: any,
  C: DataConnection
  ): Promise<DataDocument>`

```javascript
import {above, connect, findById, model} from 'maeva';
const players = model('players', {name: String});

// Find document by id
await findById(players, id);
```

## findMany => `await DataDocument`

Find documents in collection.

`function findMany<M, Q> (
  M: DataModel,
  Q: ?DataQuery,
  ...options: Array<number | number[] | {[field: string]: 1 | -1} | DataConnection>
  ): Promise<DataDocument>`

```javascript
import {connect, findMany, model} from 'maeva';
const players = model('players', {name: String, score: Number});

// Find all within default limits
await findMany(players);

// Find 100 players
await findMany(players, {});

// Limit
await findMany(players, {}, 100);

// Limit with skip
await findMany(players, {}, [50, 100]);

// Skip only
await findMany(players, {}, [50]);

// Sort
await findMany(players, {}, {name: 1, score: -1});

// Use specific connection
await findMany(players, {}, DataConnection);
```

## findOne => `await DataDocument`

Find a single document in collection.

`function findOne<M, Q> (
  M: DataModel,
  Q: ?DataQuery,
  ...options: Array<number[] | {[field: string]: 1 | -1} | DataConnection>
  ): Promise<DataDocument>`

```javascript
import {above, connect, findOne, model} from 'maeva';
const players = model('players', {name: String, score: Number});

// Find first document
await findOne(players);

// Find first matching query
await findOne(players, {score: above(100)});

// Set Offset
await findOne(players, {}, [50]);

// Sort
await findOne(players, {}, {name: 1, score: -1});

// Use specific connection
await findOne(players, {}, DataConnection);
```

- `await DataDocument[]` [insertById](doc/actions/Count.md)
- `await DataDocument[]` [insertMany](doc/actions/Count.md)
- `await DataDocument` [insertOne](doc/actions/Count.md)

## like => `DataValue`

Look for a value which is a string and is like another string.

`function like<S> (S: string): DataValue<'like', S>`

```javascript
import {findOne, like, model} from 'maeva';
const players = model('players', {name: String});
await findOne(players, {name: like('jo*')});
```

## match => `DataValue`

Look for a value which is a string and matches another string.

`function match<S> (S: string): DataValue<'match', S>`

```javascript
import {findOne, match, model} from 'maeva';
const players = model('players', {name: String});
await findOne(players, {name: match(/^jo/)});
```

## mixed => `DataType`

A type that accepts mixed types.

`function mixed<O> (...O: Array<Function | DataType>): DataType<Function, Function>`

```javascript
import {mixed, model} from 'maeva';
model('data', {value: mixed(String, Number, Boolean)});
```


## model => `DataModel`

Create a new data model.

```javascript
// @flow

function model<name, fields, options> (
  name: string,
  fields: {[field: string]: Function | DataType},
  options: {
    default?: {[field: string]: any | Function},
    didInsert?: Promise<void>,
    didRemove?: Promise<void>,
    didUpdate?: Promise<void>,
    required?: string[],
    validate?: {[field: string]: RegExp | Function},
    willInsert?: Promise<Object>,
    willRemove?: Promise<Object>,
    willUpdate?: Promise<Object>,
  }
): DataModel<name, fields, options>
```

```javascript
import {model} from 'maeva';
model(
  'players',
  {score: Number},
  {
    default: {score: 0},
    didInsert: (player) => Promise.resolve(),
    didRemove: (player) => Promise.resolve(),
    didUpdate: (player) => Promise.resolve(),
    required: ['score'],
    validate: {score: score => score < 100},
    willInsert: (player) => Promise.resolve(player),
    willRemove: (player) => Promise.resolve(player),
    willUpdate: (player) => Promise.resolve(player),
  }
 );
```

- `DataConnection` [reconnect](doc/actions/Count.md)
- `await void` [removeById](doc/actions/Count.md)
- `await void` [removeMany](doc/actions/Count.md)
- `await void` [removeOne](doc/actions/Count.md)


## shape => `DataType`

A type that accepts objects.

`function shape<O> (O: DataFields): DataType<Function, Function>`

```javascript
import {model, shape} from 'maeva';
model('team', {players: shape({name: String, score: Number})});
```

## tuple => `DataType`

A type that accepts a tuple of types.

`function tuple<...T> (...T: Array<Function | DataType>): DataType<Function, Function>`

```javascript
import {model, tuple} from 'maeva';
model('data', {value: tuple(String, Number, Boolean)});
```


## type => `DataType`

Create a custom type.

`function type<T> (T: Function | DataType): DataType<Function, Function>`

```javascript
import {isString} from 'lodash;
import {model, type} from 'maeva';
const format = value => isString(value) && value.trim();
const validate = value => isString(value) && /^.+@.+$/.test(value);
model('users', {email: type({format, validate}));
```


- `await DataResponse` [updateById](doc/actions/Count.md)
- `await DataResponse` [updateMany](doc/actions/Count.md)
- `await DataResponse` [updateOne](doc/actions/Count.md)

# Guides

- [Install](doc/Model.md)
- [Model](doc/Type.md)
  - [Field](doc/Type.md)
  - [Hooks](doc/Type.md)
- [Connect](doc/Type.md)
- [Query](doc/Type.md)
