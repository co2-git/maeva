maeva
===

JS models. Database agnostic.

# Usage

```js
import * as data from 'maeva';
import sockets from 'maeva-sockets';

// Use maeva to define a model

const players = data.model('players', {name: String, score: Number});

// Then use a maeva connector vendor to connect to a database server

const connector = sockets('ws://mysockets.com');

data.connect(connector);

await data.insertOne(players, {name: 'Joe', score: 100});
await data.findOne(players, {name: 'Joe'});
await data.updateOne(players, {name: 'Joe' }, {score: 0});
await data.removeOne(players, {name: 'Joe'});
```

# API

- [above](doc/value/Above.md)
- [after](doc/actions/Count.md)
- [any](doc/actions/Count.md)
- [array](doc/actions/Count.md)
- [before](doc/actions/Count.md)
- [boolean](doc/actions/Count.md)
- [connect](doc/actions/Count.md)
- [count](doc/actions/Count.md)
- [date](doc/actions/Count.md)
- [findMany](doc/actions/Count.md)
- [findOne](doc/actions/Count.md)
- [insertMany](doc/actions/Count.md)
- [insertOne](doc/actions/Count.md)
- [like](doc/actions/Count.md)
- [match](doc/actions/Count.md)
- [mixed](doc/actions/Count.md)
- [model](doc/actions/Count.md)
- [number](doc/actions/Count.md)
- [removeMany](doc/actions/Count.md)
- [removeOne](doc/actions/Count.md)
- [shape](doc/actions/Count.md)
- [tuple](doc/actions/Count.md)
- [type](doc/actions/Count.md)
- [updateMany](doc/actions/Count.md)
- [updateOne](doc/actions/Count.md)

# Guides

- [Install](doc/Model.md)
- [Model](doc/Type.md)
  - [Field](doc/Type.md)
  - [Hooks](doc/Type.md)
- [Connect](doc/Type.md)
- [Query](doc/Type.md)
