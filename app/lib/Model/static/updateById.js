// @flow
import Connection from '../../Connection';

export default function updateById(id, modifier, options) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = await this.findById(id, options);
      if (!doc) {
        return resolve();
      }
      doc.set(modifier);
      await doc.save();
      doc.$conn.emit('updated', this, doc);
      Connection.events.emit('updated', this, doc);
      resolve(doc);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
