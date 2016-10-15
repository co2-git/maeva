// @flow

import ModelInfo from './Info';
import count from '../static/count';
import find from '../static/find';
import create from '../static/create';
import remove from '../static/remove';

export default class ModelStatement extends ModelInfo {
  static create(...args) {
    return create.apply(this, args);
  }
  static insert(...args) {
    return this.create(...args);
  }
  static add(...args) {
    return this.create(...args);
  }
  static push(...args) {
    return this.create(...args);
  }
  static count(...args) {
    return count.apply(this, args);
  }
  static find(...args) {
    return find.apply(this, args);
  }
  static get(...args) {
    return this.find(...args);
  }
  static fetch(...args) {
    return this.find(...args);
  }
  // static findOne(...args) {
  //   return findOne.apply(this, args);
  // }
  // static findById(id: any, options: Object = {}) {
  //   return findById.apply(this, [id, options]);
  // }
  // static getById(...args) {
  //   return this.findById(...args);
  // }
  // static fetchById(...args) {
  //   return this.findById(...args);
  // }
  // static selectById(...args) {
  //   return this.findById(...args);
  // }
  // static update(query, modifier, options = {}) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const docs = await this.find(query, options);
  //       docs.forEach(doc => doc.set(modifier));
  //       await Promise.all(docs.map(doc => doc.save()));
  //       docs[0].$conn.emit('updated', this, docs);
  //       Connection.events.emit('updated', this, docs);
  //       resolve(docs);
  //     } catch (error) {
  //       console.log(error.stack);
  //       reject(error);
  //     }
  //   });
  // }
  // static updateById(id, modifier, options) {
  //   return updateById.apply(this, [id, modifier, options]);
  // }
  static remove(...args) {
    return remove.apply(this, args);
  }
  static delete(...args) {
    return this.remove(...args);
  }
  static pull(...args) {
    return this.remove(...args);
  }
}
