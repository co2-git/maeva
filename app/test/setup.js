import * as data from '..';

let connectorName;
let connector;
let url;

for (const arg of process.argv) {
  if (/^connector=/.test(arg)) {
    connectorName = arg.split('=')[1];
    connector = require(connectorName);
    if (connector.default) {
      connector = connector.default;
    }
  } else if (/^url=/.test(arg)) {
    url = arg.replace(/^url=/, '');
  }
}

if (!connector) {
  throw new Error('Missing connector. View doc/Test.md for more information');
}

try {
  require(`${connectorName}/maeva-test-setup`);
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {} else {
    throw error;
  }
}

data.connect(connector(url));
