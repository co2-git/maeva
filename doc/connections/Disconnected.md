disconnected()
===

Listen to a connection being disconnected.

```javascript
import connector from 'maeva-connector';
const connection = data.connect(connector);
data.disconnected(connection, () => {
  console.log('Disconnected')
});
```

# Arguments

- [DataConnection](../definitions/DataConnection.md)

# Return

- void
