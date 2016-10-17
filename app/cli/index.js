#! /usr/bin/env node

import path from 'path';
import maeva from '..';
import packageJSON from '../../package.json';

const disclaimer = `maeva cli v${packageJSON.version} (maeva help)`;

const usage = `${disclaimer}

# Usage

maeva [options] Model/action [query]

options --key=value
query key=value

maeva

    --connector=mongodb             # Match a module named "maeva-mongodb".

    --url=29122                     # You can omit protocol (mongodb://).
                                    # You can pass directly a number
                                      if it is a port number in localhost

    MyModel/find                    # Will import "./MyModel.js".
                                      You can also use "./MyModel.js" directly.
                                    # Find is the mehod used here.

    name=John                       # Where name is "John"


# Query arguments

We will do basic parsing.

  name=John                         # {"name": "Johm"}
  score=100                         # {"score": 100}
  connected=true                    # {"connected": true}
  score='{"$gt":100}'               # {"score": {"$gt": 100}}

# Grouped arguments

  Model/find \$or='[{"score": 100, "team": "red"}, {"score": 10, "new": true}]'

# Options

  connector                          Connector's name
  url                                Database server's url
  path                               Path to models
`;

function cli({model, action, query, options}) {
  return new Promise(async (resolve, reject) => {
    try {
      if (model === 'help') {
        console.log(usage);
        process.exit(0);
      }

      try {
        const json = require(path.join(process.cwd(), 'maeva.json'));
        options.connector = options.connector || json.connector;
        options.url = options.url || json.url;
        options.path = options.path || json.path;
      } catch (error) {
        // ...
      }

      if (!model) {
        console.log(disclaimer);
        throw new Error('Missing model');
      }

      if (!action) {
        console.log(disclaimer);
        throw new Error('Missing action');
      }

      if (!options.connector) {
        console.log(disclaimer);
        throw new Error('Missing connector');
      }

      if (!options.url) {
        console.log(disclaimer);
        throw new Error('Missing url');
      }

      const vendor = require(`maeva-${options.connector}`).default;

      const conn = await maeva.connect(vendor(options.url));

      const Model = require(path.join(process.cwd(), options.path, model))
        .default;

      let res;

      switch (action) {
      default:
        res = await Model[action](query, {conn});
        break;
      }

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
}

const [,, ...args] = process.argv;
let model;
let action;
const options = {};
const query = {};

args.forEach(arg => {
  if (/\=/.test(arg)) {
    const [key, ...values] = arg.split(/\=/);
    let value = values.join('=').trim();
    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else if (value === 'null') {
      value = null;
    } else if (/^(-|\.|\d)+(\.|\d)?$/.test(value)) {
      value = Number(value);
    } else if (/^\/.+\/(i)?$/.test(value)) {
      value = new RegExp(value);
    } else if (/^\{.+\}$/.test(value) || /^\[.+\]$/.test(value)) {
      value = JSON.parse(value);
    }
    if (/^\-\-/.test(key)) {
      options[key.replace(/^\-\-/, '')] = value;
    } else {
      query[key] = value;
    }
  } else if (/^.+\/.+$/.test(arg)) {
    const [_model, _action] = arg.split(/\//);
    model = _model;
    action = _action;
  } else {
    model = arg;
  }
});

cli({model, action, query, options})
  .then(res => {
    console.log(res);
    process.exit(0);
  })
  .catch(error => {
    console.log(error.stack);
    process.exit(8);
  });
