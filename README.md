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

- [Guide](#Guide)
  - [Install](doc/Model.md)
  - [Model](doc/Type.md)
    - [Field](doc/Type.md)
    - [Hooks](doc/Type.md)
  - [Connect](doc/Type.md)
  - [Query](doc/Type.md)
- [API](#API)
  - [above](#above)
  - [after](#after)
  - [before](#before)
  - [below](#below)
  - [connect](#connect)
  - [count](#count)
  - [disconnect](#disconnect)
  - [findById](#findById)
  - [findMany](#findMany)
  - [findOne](#findOne)
  - [insertMany](#insertMany)
  - [insertOne](#insertOne)
  - [like](#like)
  - [match](#match)
  - [mixed](#mixed)
  - [model](#model)
  - [reconnect](#reconnect)
  - [removeById](#removeById)
  - [removeMany](#removeMany)
  - [removeOne](#removeOne)
  - [shape](#shape)
  - [tuple](#tuple)
  - [type](#type)
- [Definitions](#defs)
  - [DataConnection](#DataConnection)
  - [DataConnector](#DataConnector)
  - [DataType](#DataType)
  - [DataValue](#DataValue)

# <a id="Guide"></a>Guide

# <a id="API"></a>API

## <a id="above"></a>above

Look for a value which is a number and is above another number.

`above(N)` => [DataValue](#DataValue)`<'above', N>`
- number

```javascript
// @example
await data.findOne(data.model('foo', {bar: Number}), {
  bar: data.above(10)
});
```

[back to top](#top)

## after

Look for a value which is a date and is after another date.

`after(D)` => [DataValue](#DataValue)`<'after', D>`
- Date

```javascript
// @example
await data.findOne(players, {created: data.after(new Date())});
```

[back to top](#top)

## any

A type that accepts anything.

`any()` => [DataType](#DataType)`<Function, Function>`

```javascript
// @example
import {any, model} from 'maeva';
model('foo', {value: any});
```

[back to top](#top)

## array

A type that accepts arrays.

`array(T)` => [DataType](#DataType)`<Function, Function>`
- Function | [DataType](#DataType)

```javascript
// @example
import {array, model} from 'maeva';
model('foo', {numbers: array(Number)});
```

## before

Look for a value which is a date and is before another date.

`before(D)` => [DataValue](#DataValue)`<'before', D>`
- Date

```javascript
// @example
import {before, findOne, model} from 'maeva';
const players = model('players', {created: Date});
await findOne(players, {created: before(new Date())});
```

## below

Look for a value which is a date and is after another date.

`below(N)` => [DataValue](#DataValue)`<'below', N>`
- number

```javascript
// @example
import {below, findOne, limit} from 'maeva';
const players = model('players', {score: Number});
await findOne(players, {score: below(10)});
```

## connect

Create a new connection and connect to its connector.

`connect(C)` => [DataConnection](#DataConnection)`<S, C>`
- [DataConnector](#DataConnector)

```javascript
import {connect} from 'maeva';
const connector = new DataConnector({...});
const connection = connect(connector);
```

## count

Count documents in collection.

`function count<M, Q, O, C> (M: DataModel, Q: ?DataQuery, O: ?DataOptions, C: ?DataConnection): Promise<number>`

```javascript
import {above, count, model} from 'maeva';
const players = model('players', {score: Number});
await count(players, {score: above(100)});
```

## disconnect

Disconnect a connection

`function disconnect<C> (C: DataConnection): Promise<void>`

```javascript
import {disconnect} from 'maeva';
await disconnect(DataConnection);
```

## findById

Find a single document by id in collection.

```javascript
// @flow
function findById<M, I> (
  M: DataModel,
  I: any,
  C: DataConnection
  ): Promise<DataDocument>
```

```javascript
// @example
import {above, connect, findById, model} from 'maeva';
const players = model('players', {name: String});

// Find document by id
await findById(players, id);
```

## findMany

Find documents in collection.

```javascript
// @flow
function findMany<M, Q> (
  M: DataModel,
  Q: ?DataQuery,
  ...options: Array<number | number[] | {[field: string]: 1 | -1} | DataConnection>
  ): Promise<DataDocument>
```

```javascript
// @example
const players = data.model('players', {name: String, score: Number});

// Find all within default limits
await data.findMany(players);

// Find 100 players
await data.findMany(players, {});

// Limit
await data.findMany(players, {}, 100);

// Limit with skip
await data.findMany(players, {}, [50, 100]);

// Skip only
await data.findMany(players, {}, [50]);

// Sort
await data.findMany(players, {}, {name: 1, score: -1});

// Use specific connection
await data.findMany(players, {}, DataConnection);
```

## findOne

Find a single document in collection.

```javascript
// @flow
function findOne<M, Q> (
  M: DataModel,
  Q: ?DataQuery,
  ...options: Array<number[] | {[field: string]: 1 | -1} | DataConnection>
  ): Promise<DataDocument>
```

```javascript
// @example
const players = data.model('players', {name: String, score: Number});

// Find first document
await data.findOne(players);

// Find first matching query
await data.findOne(players, {score: above(100)});

// Set Offset
await data.findOne(players, {}, [50]);

// Sort
await data.findOne(players, {}, {name: 1, score: -1});

// Use specific connection
await data.findOne(players, {}, DataConnection);
```

## insertMany

Insert documents in collection.

`function insertMany<M, ...O> (
  M: DataModel,
  ...O: Object | DataConnection,
  ): Promise<DataDocument>`

```javascript
import {connect, insertMany, model} from 'maeva';
const players = model(
  'players',
  {name: String, score: Number},
  {default: {score: 0}}
 );
await insertMany(players, {name: 'A'}, {name: 'B', score: 100});
```

## insertOne

Insert a single document in collection.

`function insertOne<M, O> (
  M: DataModel,
  O: Object,
  DataConnection
  ): Promise<DataDocument>`

```javascript
import {insertOne, model} from 'maeva';
const players = model('players', {name: String, score: Number});
await insertOne(players, {name: 'A'});
```

## like

Look for a value which is a string and is like another string.

`function like<S> (S: string): DataValue<'like', S>`

```javascript
import {findOne, like, model} from 'maeva';
const players = model('players', {name: String});
await findOne(players, {name: like('jo*')});
```

## match

Look for a value which is a string and matches another string.

`function match<S> (S: string): DataValue<'match', S>`

```javascript
import {findOne, match, model} from 'maeva';
const players = model('players', {name: String});
await findOne(players, {name: match(/^jo/)});
```

## mixed

A type that accepts mixed types.

`function mixed<O> (...O: Array<Function | DataType>): DataType<Function, Function>`

```javascript
import {mixed, model} from 'maeva';
model('data', {value: mixed(String, Number, Boolean)});
```


## model

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
  {created: Date, name: String, score: Number},
  {
    default: {score: 0, created: () => new Date()},
    didInsert: (player) => Promise.resolve(),
    didRemove: (player) => Promise.resolve(),
    didUpdate: (player) => Promise.resolve(),
    required: ['score'],
    validate: {score: score => score < 100, name: /^\w/},
    willInsert: (player) => Promise.resolve({...player}),
    willRemove: (player) => Promise.resolve({...player}),
    willUpdate: (player) => Promise.resolve({...player}),
  }
 );
```


## reconnect

Reconnect a connection

`function reconnect<C> (C: DataConnection): Promise<void>`

```javascript
await data.reconnect(DataConnection);
```

## removeById

Remove a single document by id in collection.

```javascript
// @flow
function removeById<M, I> (
  M: DataModel,
  I: any,
  C: ?DataConnection
  ): Promise<DataDocument>
```

```javascript
// @example
await data.removeById(players, id);
```

## removeMany

Remove documents in collection.

`removeMany()`
- [DataModel](#DataModel)
- ?Object | [DataQuery](#DataQuery) default `new DataQuery({})`
- ?Object | [DataProjection](#DataProjection) default `new DataProjection({})`
- ?[DataConnection]#DataConnection)
=> `number`

```javascript
// @flow
function removeMany<DataModel, Dat

function removeMany<M, Q> (
  M: DataModel,
  Q: ?Object,
  ...options: Array<number | number[] | {[field: string]: 1 | -1} | DataConnection>
  ): Promise<DataDocument>
```

```javascript
// @example
const players = data.model('players', {name: String, score: Number});

// Find all within default limits
await data.findMany(players);

// Find 100 players
await data.findMany(players, {});

// Limit
await data.findMany(players, {}, 100);

// Limit with skip
await data.findMany(players, {}, [50, 100]);

// Skip only
await data.findMany(players, {}, [50]);

// Sort
await data.findMany(players, {}, {name: 1, score: -1});

// Use specific connection
await data.findMany(players, {}, DataConnection);
```

## findOne

Find a single document in collection.

```javascript
// @flow
function findOne<M, Q> (
  M: DataModel,
  Q: ?DataQuery,
  ...options: Array<number[] | {[field: string]: 1 | -1} | DataConnection>
  ): Promise<DataDocument>
```

```javascript
// @example
const players = data.model('players', {name: String, score: Number});

// Find first document
await data.findOne(players);

// Find first matching query
await data.findOne(players, {score: above(100)});

// Set Offset
await data.findOne(players, {}, [50]);

// Sort
await data.findOne(players, {}, {name: 1, score: -1});

// Use specific connection
await data.findOne(players, {}, DataConnection);
```


## shape => `DataType`

A type that accepts objects.

`function shape<O> (O: DataFields): DataType<Function, Function>`

```javascript
// @example
data.model('players', {location: data.shape({
  latitude: Number,
  longitude: Number,
  elevation: Number,
  precision: Number,
})});
```

## tuple

A type that accepts a tuple of types.

`function tuple<...T> (...T: Array<Function | DataType>): DataType<Function, Function>`

```javascript
// @example
data.model('data', {value: data.tuple(String, Number, Boolean)});
```


## type => `DataType`

Create a custom type.

`function type<T> (T: Function | DataType): DataType<Function, Function>`

```javascript
import {isString} from 'lodash';
import {model, type} from 'maeva';
const format = value => isString(value) && value.trim();
const validate = value => isString(value) && /^.+@.+$/.test(value);
model('users', {email: type({format, validate}));
```


- `await DataResponse` [updateById](doc/actions/Count.md)
- `await DataResponse` [updateMany](doc/actions/Count.md)
- `await DataResponse` [updateOne](doc/actions/Count.md)

# <a id="defs"></a>Definitions
