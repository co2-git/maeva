import _ from 'lodash';
import Connection from './Connection';
import type {
  FINDER,
  INSERTER,
  UPDATER,
  REMOVER,
} from './flow';

const db = {};

export default
function test(): (conn: Connection) => Promise<void> {
  return (conn: Connection): Promise<*> => new Promise((resolve, reject) => {
    try {
      conn.operations = {
        find: (finder: FINDER) => new Promise((resolveFind, rejectFind) => {
          try {
            let results = null;
            if (!_.isEmpty(finder.query)) {
              results = _.find(db[finder.collection], finder.query);
            } else {
              results = db[finder.collection];
            }
            if (_.isObject(results) && !_.isArray(results)) {
              results = [results];
            }
            resolveFind(results);
          } catch (error) {
            rejectFind(error);
          }
        }),
        insert: (inserter: INSERTER) =>
        new Promise((resolveInsert, rejectInsert) => {
          try {
            if (!db[inserter.collection]) {
              db[inserter.collection] = [];
            }
            if (Array.isArray(inserter.documents)) {
              db[inserter.collection].push(...inserter.documents);
            } else {
              db[inserter.collection].push(inserter.documents);
            }
            resolveInsert(inserter.documents);
          } catch (error) {
            rejectInsert(error);
          }
        }),
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
        remove: (remover: REMOVER) =>
        new Promise((resolveRemove, rejectRemove) => {
          try {
            if (!db[remover.collection]) {
              db[remover.collection] = [];
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
        }),
      };
      conn.disconnectDriver = () => new Promise((resolveDisconnect) => {
        resolveDisconnect();
      });
      conn.id = false;
      conn.schema = {};
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
