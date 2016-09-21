import Connection from './Connection';

export
type FINDER = {
  collection: string,
  query: ?Object,
};

export
type INSERTER = {
  collection: string,
  documents: Object[],
};

export
type UPDATER = {
  collection: string,
  get: ?Object,
  set: Object,
};

export
type REMOVER = {
  collection: string,
  get: ?Object,
};

// options that can be passed to a model constructor
export
type MODEL_CONSTRUCTOR_OPTIONS = {
  fromDB?: boolean,
  conn: Connection,
};
