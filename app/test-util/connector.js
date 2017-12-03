import _ from 'lodash';
import EventEmitter from 'events';
let id = 0;
const data = [];
const emitter = new EventEmitter();

export default () => ({
  actions: {
    connect: () => {
      setTimeout(() => emitter.emit('connected'));
    },
    insertOne: doc => new Promise((resolve, reject) => {
      try {
        const newDoc = {...doc, id: id++};
        data.push(newDoc);
        resolve(newDoc);
      } catch (error) {
        reject(error);
      }
    }),
    insertMany: docs => new Promise((resolve, reject) => {
      try {
        const $docs = docs.map(doc => ({...doc, id: id++}));
        data.push(...$docs);
        resolve($docs);
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
    }),
    findMany: query => new Promise((resolve, reject) => {
      try {
        const doc = _.filter(data, query);
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    }),
    findById: queryId => new Promise((resolve, reject) => {
      try {
        const doc = _.find(data, {id: queryId});
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    }),
    findByIds: queryIds => new Promise((resolve, reject) => {
      try {
        const docs = _.filter(data, item => _.includes(queryIds, item.id));
        resolve(docs);
      } catch (error) {
        reject(error);
      }
    }),
    updateById: (_id, updater) => new Promise((resolve, reject) => {
      try {
        const doc = _.find(data, {id: _id});
        resolve({...doc, ...updater});
      } catch (error) {
        reject(error);
      }
    }),
  },
  id: {
    name: 'id',
    type: Number,
  },
  emitter,
});
