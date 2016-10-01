import Connection from './Connection';
import Model from './Model';

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

// operations a vendor client should provide
export
type OPERATIONS = {
  find: (finder: FINDER) => Promise<Model|Model[]>,
  findOne: (finder: FINDER) => Promise<Model|Model[]>,
  findById: (finder: FINDER) => Promise<Model|Model[]>,
  insert: (inserter: INSERTER) => Promise<Model|Model[]>,
};
