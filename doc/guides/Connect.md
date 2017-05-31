Connect
===

Once you have defined a data model, you need to create connections in order to communicate with a database server.

# Usage

```javascript
import mysql from 'maeva-mysql';
const connection = data.connect(mysql());
```

# Connector

You need a connector to establish a connection. View [Connectors guide](Connectors.md). You can also [write your own connector](Write your own connector.md).

# Connection consumption by queries

This is a classic way to connect to a database server and send it queries:

```javascript
import mysql from 'maeva-mysql';
data.connect(mysql());
await data.findMany(dataModel, 100);
```

When you create a new connection, it gets cached as an available connection. All the connection requesters (`find*`, `update*`, etc) gets assigned a random connection in pool. Here, `findMany` will get executed once mysql link is established.

# Database

Each connection should have a database name.

# Events

## connected

Fired when connection is successfully connected to database server.

```javascript
const connection = data.connect(connector);
data.connected(connection, () => console.log('Connection established'));
```

## disconnected

Fired when connection gets disconnected from database server.

```javascript
const connection = data.connect(connector);
data.disconnected(connection, () => console.log('Connection end'));
```

## inserted

Fired when a new document is added in database (provided insertion was made via `maeva`).

```javascript
const connection = data.connect(connector);
data.inserted(connection, (collection, document) => console.log({inserted: {collection, document}}));
```

## removed

Fired when a document is removed from database (provided removal was made via `maeva`).

```javascript
const connection = data.connect(connector);
data.updated(connection, (collection, document) => console.log({updated: {collection, document}}));
```

## updated

Fired when a document is updated from database (provided update was made via `maeva`).

```javascript
const connection = data.connect(connector);
data.updated(connection, (collection, document) => console.log({updated: {collection, document}}));
```

# Multiple connections

# Reconnect

# Disconnect
