import * as data from '..';

let connector;
let url;

for (const arg of process.argv) {
  if (/^connector=/.test(arg)) {
    connector = require(arg.split('=')[1]);
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

data.connect(connector(url));
