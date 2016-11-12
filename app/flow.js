// @flow

import Connection from './lib/Connection';
import Schema from './lib/Schema';
import Model from './lib/Model';

// JavaScript built-in

declare type $error = Error | {
  name: string,
  message: string,
  stack?: string,
};

declare type $regex = RegExp | {
  global: boolean,
  ignoreCase: boolean,
  multiline: boolean,
  source: string,
};

// maeva common types

declare type $id = any;

declare type $options = {
  conn?: Connection,
};

declare type $fields = {
  [fieldName: string]: any,
};

// connections

declare type $Connection = Connection;

declare type $Connection$status = 'idle'
| 'connecting'
| 'connected'
| 'disconnecting'
| 'disconnected'
| 'failed';

declare type $Connection$operations = {
  find: (finder: $Query$finder) => Promise<Object|Object[]>,
  findOne: (finder: $Query$finder$one) => Promise<Object|Object[]>,
  findById: (finder: $Query$finder$byId) => Promise<Object|Object[]>,
  insert: (inserter: $Query$inserter) => Promise<Object|Object[]>,
  update: (updater: $Query$updater) => Promise<Object|Object[]>,
  count: (finder: $Query$finder) => Promise<number>,
  removeById: (remover: $Query$remover$byId) => Promise<void>,
  remove: (remover: $Query$remover) => Promise<any>,
};

// queries

declare type $Query$finder = {
  collection: string,
  get: $fields,
  model: Model,
  options: $get$options,
};

declare type $Query$finder$byId = {
  collection: string,
  get: $fields,
  model: Model,
  options: {},
};

declare type $Query$finder$one = {
  collection: string,
  get: $fields,
  model: Model,
  options: {},
};

declare type $Query$inserter = {
  collection: string,
  documents: $fields | $fields[],
};

declare type $Query$updater = {
  collection: string,
  get: $fields,
  set: $fields,
};

declare type $Query$remover$byId = {
  model: Model,
  collection: string,
  id: $id,
  options: {},
};

declare type $Query$remover = {
  model: Model,
  collection: string,
  get: $fields,
  options: {},
};

declare type $get$options = {
  limit?: number,
  skip?: number,
};

// models

declare type $Model = Model;

declare type $Model$info = {
  name: string,
  version: number,
  collectionName: string,
  schema: Schema | false,
};

declare type $Model$options = {
  conn?: Connection,
  fromDB?: boolean,
};

// fields

declare type $Field$JSON = {
  type: string,
  required: ?boolean,
  default: any,
  validate: ?string,
  embeddedSchema?: $Schema$JSON,
  arrayOf?: string,
};

// schemas

declare type $Schema$JSON = {
  [fieldName: string]: $Field$JSON,
};

declare type $Model$create = Promise<Model | Model[]>;
