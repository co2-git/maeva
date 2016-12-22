/**
 *  ****************************************************************************
 *  @module module
 *  @name name
 *  @description description
 *  @author francois
 *  @license MIT
 *  @type function
 *  @flow
 *  ****************************************************************************
**/

import Connection from '../../Connection';

export default
function update(get: {}, set: {}, options: {}): Promise<Object[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = await this.find(get, options);
      if (!docs.length) {
        return resolve([]);
      }
      await Promise.all(docs.map((doc) => doc.set(set).save()));
      docs[0].$conn.emit('updated', this, docs);
      Connection.events.emit('updated', this, docs);
      resolve(docs);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
