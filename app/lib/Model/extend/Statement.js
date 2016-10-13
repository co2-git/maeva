// @flow

import ModelInfo from './Info';
import Schema from '../../Schema';
import Connection from '../../Connection';

export default class ModelStatement extends ModelInfo {
  // static async makeStatement(query: Object = {}, schema: Schema|Object = {}):
  // MAKESTATEMENT_RETURN {
  //   const conn = await Connection.findConnection();
  //   const model = new this({}, {conn});
  //   const statement = await makeStatement(query, model.$schema);
  //   return {model, statement, conn};
  // }
  // static create(...args: CREATE_ARGS) {
  //   return create.apply(this, args);
  // }
  // static insert(...args: CREATE_ARGS) {
  //   return this.create(...args);
  // }
  // static add(...args: CREATE_ARGS) {
  //   return this.create(...args);
  // }
  // static push(...args: CREATE_ARGS) {
  //   return this.create(...args);
  // }
  // static find(...args: FIND_ARGS): FIND_RETURN {
  //   return find.apply(this, args);
  // }
  // static findOne(...args) {
  //   return findOne.apply(this, args);
  // }
  // static findById(id: any, options: Object = {}) {
  //   return findById.apply(this, [id, options]);
  // }
  // static get(...args) {
  //   return this.find(...args);
  // }
  // static fetch(...args) {
  //   return this.find(...args);
  // }
  // static select(...args) {
  //   return this.find(...args);
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
  // static remove(...args: REMOVE_ARGS): REMOVE_RETURN {
  //   return remove.apply(this, args);
  // }
  // static delete(...args) {
  //   return this.remove(...args);
  // }
  // static pull(...args) {
  //   return this.remove(...args);
  // }
}
