// @flow
import Model from '../../Model';
import Connection from '../../Connection';

type DOCUMENT = ?Object|Object[];

export default function create(
  document: DOCUMENT,
  options: ?Object = {}
): Promise<Model|Model[]> {
  return new Promise(async (resolve, reject) => {
    try {
      let conn;
      if (options.conn) {
        conn = options.conn;
      } else {
        conn = await Connection.findConnection();
      }
      let docs;
      if (Array.isArray(document)) {
        docs = document.map(doc => new this(doc, {
          ...options,
          conn,
        }));
      } else {
        docs = [new this(document, {
          ...options,
          conn,
        })];
      }
      await Promise.all(docs.map(doc => doc.make()));
      const results = await conn.operations.insert({
        model: this,
        collection: this._getCollectionName(),
        documents: docs,
      });
      results.forEach((result: Object, index: number) => {
        for (const field in result) {
          if (!docs[index][field] || result[field] !== docs[index][field]) {
            docs[index].set(field, result[field]);
          }
        }
      });
      conn.emit('inserted', this, docs);
      Connection.events.emit('inserted', this, docs);
      if (Array.isArray(document)) {
        resolve(docs);
      } else {
        resolve(docs[0]);
      }
    } catch (error) {
      reject(error);
    }
  });
}
