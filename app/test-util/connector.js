import _ from 'lodash';
let id = 0;
const data = [];

export default {
  data,
  connector: {
    actions: {
      insertOne: doc => new Promise((resolve, reject) => {
        try {
          const newDoc = {...doc, id: id++};
          data.push(newDoc);
          resolve(newDoc);
        } catch (error) {
          reject(error);
        }
      }),
      findOne: query => new Promise((resolve, reject) => {
        try {
          const doc = _.find(data, query);
          resolve(doc);
        } catch (error) {
          reject(error);
        }
      })
    },
    id: {
      name: 'id',
      type: Number,
    },
  }
};
