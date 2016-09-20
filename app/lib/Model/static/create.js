// @flow
import Model from '../../Model';
import Connection from '../../Connection';

type DOCUMENT = ?Object|Object[];
export type ARGS = [DOCUMENT, ?Object];

export default function create(
  document: DOCUMENT,
  options: Object = {}
): Promise<Model|Model[]> {
  return new Promise(async (resolve, reject) => {
    try {
      let docs;
      if (Array.isArray(document)) {
        docs = document.map(doc => new this(doc, options));
      } else {
        docs = [new this(document, options)];
      }
      await Promise.all(docs.map(doc => doc.save({
        dontSend: true,
      })));
      const results = await docs[0].$conn.operations.insert({
        model: this,
        collection: this.getCollectionName(),
        documents: docs,
      });
      results.forEach((result: Object, index: number) => {
        for (const field in result) {
          if (!docs[index][field] || result[field] !== docs[index][field]) {
            docs[index].set(field, result[field]);
          }
        }
      });
      docs[0].$conn.emit('created', this, docs);
      Connection.events.emit('created', this, docs);
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
