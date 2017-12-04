import _ from 'lodash';
import EventEmitter from 'events';

import isPrimitive from '../types/isPrimitive';

const emitter = new EventEmitter();

const collections = {};

const find = (documents, query) => {
  console.log(require('util').inspect({query}, { depth: null }));
  const keys = _.keys(query).length;
  if (!keys) {
    return documents;
  }
  return documents.reduce(
    (found, document) => {
      let matches = 0;
      for (const key in query) {
        let value = query[key];
        if (isPrimitive(value)) {
          if (/\./.test(key)) {
            if (_.get(document, key) === query[key]) {
              matches++;
            }
          } else if ((key in document) && document[key] === query[key]) {
            matches++;
          }
        } else if (typeof value === 'object') {
          for (const metaKey in value) {
            switch (metaKey) {
            case 'in':
              if (_.includes(value.in, document[key])) {
                matches++;
              }
              break;
            case 'out':
              if (!_.includes(value.out, document[key])) {
                matches++;
              }
              break;
            case 'not':
              if (document[key] !== value.not) {
                matches++;
              }
              break;
            }
          }
        }
      }
      if (matches === keys) {
        found.push(document);
      }
      return found;
    },
    []
  );
};

export default () => ({
  actions: {
    connect: () => {
      setTimeout(() => emitter.emit('connected'));
    },
    count: (query, model) => new Promise((resolve, reject) => {
      try {
        let collection = collections[model.name];
        if (!collection) {
          collections[model.name] = {
            documents: [],
            id: 0,
          };
          collection = collections[model.name];
        }
        const docs = find(collection.documents, query);
        resolve(docs.length);
      } catch (error) {
        reject(error);
      }
    }),
    insertOne: (doc, model) => new Promise((resolve, reject) => {
      try {
        let collection = collections[model.name];
        if (!collection) {
          collections[model.name] = {
            documents: [],
            id: 0,
          };
          collection = collections[model.name];
        }
        const newDoc = {...doc, id: collection.id++};
        collection.documents.push(newDoc);
        resolve(newDoc);
      } catch (error) {
        reject(error);
      }
    }),
    insertMany: (docs, model) => new Promise((resolve, reject) => {
      try {
        let collection = collections[model.name];
        if (!collection) {
          collections[model.name] = {
            documents: [],
            id: 0,
          };
          collection = collections[model.name];
        }
        const $docs = docs.map(doc => ({...doc, id: collection.id++}));
        collection.documents.push(...$docs);
        resolve($docs);
      } catch (error) {
        reject(error);
      }
    }),
    findOne: (query, model) => new Promise((resolve, reject) => {
      try {
        let collection = collections[model.name];
        if (!collection) {
          collections[model.name] = {
            documents: [],
            id: 0,
          };
          collection = collections[model.name];
        }
        const doc = _.find(collection.documents, query);
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    }),
    findMany: (query, model) => new Promise((resolve, reject) => {
      try {
        let collection = collections[model.name];
        if (!collection) {
          collections[model.name] = {
            documents: [],
            id: 0,
          };
          collection = collections[model.name];
        }
        const doc = _.filter(collection.documents, query);
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    }),
    findById: (id, model) => new Promise((resolve, reject) => {
      try {
        let collection = collections[model.name];
        if (!collection) {
          collections[model.name] = {
            documents: [],
            id: 0,
          };
          collection = collections[model.name];
        }
        const doc = _.find(collection.documents, {id});
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    }),
    findByIds: (ids, model) => new Promise((resolve, reject) => {
      try {
        let collection = collections[model.name];
        if (!collection) {
          collections[model.name] = {
            documents: [],
            id: 0,
          };
          collection = collections[model.name];
        }
        const docs = _.filter(
          collection.documents,
          document => _.includes(ids, document.id)
        );
        resolve(docs);
      } catch (error) {
        reject(error);
      }
    }),
    updateById: (id, updater, model) => new Promise((resolve, reject) => {
      try {
        let collection = collections[model.name];
        if (!collection) {
          collections[model.name] = {
            documents: [],
            id: 0,
          };
          collection = collections[model.name];
        }
        const doc = _.find(collection.documents, {id});
        resolve({...doc, ...updater});
      } catch (error) {
        reject(error);
      }
    }),
    removeMany: (query, model) => new Promise((resolve, reject) => {
      try {
        let collection = collections[model.name];
        if (!collection) {
          collections[model.name] = {
            documents: [],
            id: 0,
          };
          collection = collections[model.name];
        }
        const removed = _.remove(collection.documents, query);
        resolve(removed);
      } catch (error) {
        reject(error);
      }
    }),
  },
  id: {
    name: 'id',
    type: {
      convert: value => {
        if (typeof value === 'number') {
          return value;
        }
        if (typeof value === 'object' && ('id' in value)) {
          return value.id;
        }
        return Number(value);
      },
      validate: value => {
        if (isNaN(value)) {
          throw new Error('Id must be an id');
        }
      }
    },
  },
  emitter,
});
