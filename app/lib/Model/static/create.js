// @flow
import Connection from '../../Connection';
import MaevaError from '../../Error';

export default function create(
  document: $fields | $fields[] = {},
  options: $options = {}
): $Model$create {
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
      const maeva_model_create_makeDoc = (doc) => doc.make();
      await Promise.all(docs.map(maeva_model_create_makeDoc));
      const results = await conn.operations.insert({
        model: this,
        collection: this._getCollectionName(),
        set: docs,
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
      reject(new MaevaError(
        'Could not create document(s)',
        error,
        {document, options},
      ));
    }
  });
}
