// @flow
import _ from 'lodash';
import uuid from 'uuid';
import Connection from './Connection';
import type {
  FINDER,
  INSERTER,
  UPDATER,
  REMOVER,
} from './flow';
import _String from './Type/String';

export const db = {};

export default
function test(): (conn: Connection) => Promise<void> {
  return (conn: Connection): Promise<*> => new Promise((resolve, reject) => {
    try {
      const find: Function = (finder: FINDER) =>
      new Promise(async (resolveFind, rejectFind) => {
        try {
          let results = null;
          if (!_.isEmpty(finder.query)) {
            results = _.find(db[finder.collection], finder.query) || [];
          } else {
            results = db[finder.collection];
          }
          if (_.isObject(results) && !_.isArray(results)) {
            results = [results];
          }
          if (finder.options.populate && results) {
            const populatable = finder.model.getPopulatableFields();
            const promises = results.map(result => Promise.all(
              populatable.map(model =>
                new Promise(async (resolvePopulate, rejectPopulate) => {
                  try {
                    const associated = await model.type
                      .findById(result[model.field]);
                    result[model.field] = associated;
                    resolvePopulate();
                  } catch (error) {
                    rejectPopulate(error);
                  }
                })
              )
            ));
            await Promise.all(promises);
          }
          resolveFind(results);
        } catch (error) {
          rejectFind(error);
        }
      });

      const findOne: Function = (finder: FINDER) =>
      new Promise(async (resolveFind, rejectFind) => {
        try {
          const results = await find(finder);
          resolveFind(results[0]);
        } catch (error) {
          rejectFind(error);
        }
      });

      const findById: Function = (finder: FINDER) =>
      new Promise(async (resolveFind, rejectFind) => {
        try {
          let results = null;
          if (!_.isEmpty(finder.query)) {
            results = _.find(db[finder.collection], {id: finder.id}) || [];
          } else {
            results = db[finder.collection];
          }
          results = results[0];
          resolveFind(results);
        } catch (error) {
          rejectFind(error);
        }
      });

      const insert = (inserter: INSERTER): Promise<Object|Object[]> =>
      new Promise((resolveInsert, rejectInsert) => {
        try {
          if (!db[inserter.collection]) {
            db[inserter.collection] = [];
          }
          if (Array.isArray(inserter.documents)) {
            inserter.documents = inserter.documents.map(doc => ({
              ...doc,
              id: uuid.v4(),
            }));
            db[inserter.collection].push(...inserter.documents);
          } else {
            if (conn.id) {
              inserter.documents.id = uuid.v4();
            }
            db[inserter.collection].push(inserter.documents);
          }
          resolveInsert(inserter.documents);
        } catch (error) {
          rejectInsert(error);
        }
      });

      const remove = (remover: REMOVER) =>
      new Promise((resolveRemove, rejectRemove) => {
        try {
          if (!db[remover.collection]) {
            db[remover.collection] = [];
          }
          if (_.isEmpty(remover.get)) {
            let matches = db[remover.collection];
            db[remover.collection] = [];
            return resolveRemove(matches.length);
          }
          let matches = _.find(db[remover.collection], remover.get) || [];
          if (!_.isArray(matches)) {
            matches = [matches];
          }
          db[remover.collection] = db[remover.collection].filter(
            doc => !_.matches(remover.get)(doc)
          );
          resolveRemove(matches.length);
        } catch (error) {
          rejectRemove(error);
        }
      });

      conn.operations = {
        find,
        findOne,
        findById,
        insert,
        update: (updater: UPDATER) =>
        new Promise((resolveUpdate, rejectUpdate) => {
          try {
            if (!db[updater.collection]) {
              db[updater.collection] = [];
            }
            let matches = _.find(db[updater.collection], updater.get) || [];
            if (!_.isArray(matches)) {
              matches = [matches];
            }
            db[updater.collection] = _.map(db[updater.collection], doc => {
              if (_.matches(updater.get)(doc)) {
                doc = {...doc, ...updater.set};
              }
              return doc;
            });
            resolveUpdate(matches.map(doc => ({...doc, ...updater.set})));
          } catch (error) {
            console.log(error.stack);
            rejectUpdate(error);
          }
        }),
        remove,
      };
      conn.disconnectDriver = () => new Promise((resolveDisconnect) => {
        resolveDisconnect();
      });
      conn.id = {name: 'id', type: _String};
      conn.schema = {
        id: _String,
      };
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
