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
        update: (doc) => new Promise((resolve) => resolve(doc)),
        delete: (doc) => new Promise((resolve) => resolve(doc)),
      };
      conn.disconnectDriver = () => new Promise((resolve) => {
        resolve();
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
