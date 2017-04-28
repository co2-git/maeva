// @flow
import Field from '../app/lib/Field';
import Model from '../app/lib/Model';
import Type from '../app/lib/types/Type';

// Type

declare type MaevaType = Type;

// Model

declare type MaevaHook =
  | 'willInsert'
  | 'didInsert'
  | 'willUpdate'
  | 'didUpate'
  | 'willRemove'
  | 'didRemove'
  ;

declare type MaevaStaticModel = {
  willInsert?: () => Promise<void> | Promise<void>[],
  didInsert?: () => Promise<void> | Promise<void>[],
  willUpdate?: () => Promise<void> | Promise<void>[],
  didUpate?: () => Promise<void> | Promise<void>[],
  willRemove?: () => Promise<void> | Promise<void>[],
  didRemove?: () => Promise<void> | Promise<void>[],
};

// Field

declare type MaevaField = Field;

declare type MaevaSchema = {
  [field]: Field,
};

declare type MaevaSchemaJSON = {
  [field: string]: {
    type: string,
  },
};

// Connection

declare type MaevaConnectionStatus =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'disconnecting'
  | 'disconnected'
  | 'failed'
  ;

declare type MaevaConnectorInterface = {
  count: (query: MaevaQuery) => Promise<number>,
  findMany: (query: MaevaQuery) => Promise<Object|Object[]>,
  findOne: (query: MaevaQuery) => Promise<Object|Object[]>,
  insertMany: (query: MaevaQuery) => Promise<Object|Object[]>,
  insertOne: (query: MaevaQuery) => Promise<Object|Object[]>,
  removeMany: (query: MaevaQuery) => Promise<void>,
  removeOne: (query: MaevaQuery) => Promise<any>,
  updateMany: (query: MaevaQuery) => Promise<void>,
  updateOne: (query: MaevaQuery) => Promise<any>,
};



declare type MaevaSortBy =
  | string
  | string[]
  | {[field: string]: -1 | 1}
  ;

declare type MaevaConnector = (conn: MaevaConnection) => MaevaConnectorInterface;

declare type MaevaFieldConstructor = Function | MaevaField;

declare type MaevaFieldAttributes = {
  required: boolean,
  default?: Function | any,
  validate?: RegExp | Function,
};

declare type MaevaConnectorResponse = {
  query: MaevaQuery,
  results: {
    get?: Object[],
    set?: Object[],
  },
};

declare type MaevaResponse = {
  query: {

  },
};
