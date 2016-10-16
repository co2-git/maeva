#! /usr/bin/env node

import path from 'path';
import _ from 'lodash';
import maeva from '..';
import packageJSON from '../../package.json';

const disclaimer = `maeva cli v${packageJSON.version} (maeva help)`;

const usage = `${disclaimer}

# Usage

maeva

    connector=mongodb             # Match a module named "maeva-mongodb".

    url=29122                     # You can omit protocol (mongodb://).
                                  # You can pass directly a number
                                    if it is a port number in localhost

    MyModel                       # Will import "./MyModel.js".
                                    You can also use "./MyModel.js" directly.

    find                          # the name of the action to perform
      name:"john"                 # key:values separated by :
                                    mean they are query arguments


# Query arguments

  field:value                     # WHERE field = value
  field>value                     # WHERE field > value
  field>=value                    # WHERE field >= value
  field<value                     # WHERE field < value
  field<=value                    # WHERE field <= value
  field!value                     # WHERE field != value
  field:[1, 2]                    # WHERE field = 1 OR field = 2
  field![1,2]                     # WHERE field != 1 AND field=2
  field!![1,2]                    # WHERE field !=1 OR field!=2
  %%foo:1,bar:2%foo:2,bar:3%%     # WHERE (foo = 1 AND bar = 2) OR
                                      (foo = 2 and bar = 3)
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
      case 'find':
      case 'count':
      case 'create':
      case 'insert':
      case 'remove':
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
  if (_.includes([
    'count',
    'find',
    'create',
    'insert',
    'remove',
  ], arg)) {
    action = arg;
  } else if (/\=/.test(arg)) {
    const [key, ...value] = arg.split(/\=/);
    options[key] = value.join('=');
  } else if (/:/.test(arg)) {
    const [key, ...value] = arg.split(/:/);
    query[key] = JSON.parse(value.join(':'));
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
