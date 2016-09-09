import _ from 'lodash';
const db = {};

export default
function test(url: number|string): (conn: Connection) => Promise<void> {
  return (conn: Connection): Promise<*> => new Promise((resolve, reject) => {
    try {
      conn.operations = {
        find: (finder) => new Promise((resolve, reject) => {
          let results = null;
          if (!_.isEmpty(finder.query)) {
            results = _.find(db[finder.collection], finder.query);
          } else {
            results = db[finder.collection];
          }
          if (_.isObject(results) && !_.isArray(results)) {
            results = [results];
          }
          resolve(results);
        }),
        insert: (inserter) => new Promise((resolve, reject) => {
          try {
            if (!db[inserter.collection]) {
              db[inserter.collection] = [];
            }
            if (Array.isArray(inserter.documents)) {
              db[inserter.collection].push(...inserter.documents);
            } else {
              db[inserter.collection].push(inserter.documents);
            }
            resolve(inserter.documents);
          } catch (error) {
            reject(error);
          }
        }),
        update: (updater) => new Promise((resolve, reject) => {
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
            resolve(matches.map(doc => ({...doc, ...updater.set})));
          } catch (error) {
            console.log(error.stack);
            reject(error);
          }
        }),
        delete: (doc) => new Promise((resolve) => resolve(doc)),
      };
      conn.disconnectDriver = () => new Promise((resolve) => {
        resolve();
      });
      conn.id = false;
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
