import Model from './app/lib/Model';

export type STATUS = 'idle'
  |'connecting'
  |'connected'
  |'disconnecting'
  |'disconnected';

export type PROJECTION = {
  limit: number|false,
  skip: number,
};

export type OPTIONS = {

};

export type OPERATIONS = {
  find: (
    query: Object,
    projection: PROJECTION,
    options: OPTIONS) => Promise<Model[]>,
  findOne: (
    query: Object,
    projection: PROJECTION,
    options: OPTIONS) => Promise<Model[]>,
  insert: (
    query: Object,
    projection: PROJECTION,
    options: OPTIONS) => Promise<Model[]>,
};
