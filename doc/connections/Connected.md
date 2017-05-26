connected()
===

Listen to a connection being successfully connected.

```javascript
import connector from 'maeva-connector';
const connection = data.connect(connector);
data.connected(connection, () => {
  console.log('Connected')
});
```

# Arguments

- [DataConnection](../definitions/DataConnection.md)

# Return

- void
