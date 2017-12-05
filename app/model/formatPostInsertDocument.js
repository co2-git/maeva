import pick from 'lodash/pick';
import keys from 'lodash/keys';

import convertFieldsForInsert from '../model/convertFieldsForInsert';
import didInsert from '../model/didInsert';

const formatPostInsertDocument = (model, response, connection) =>
new Promise(async (resolve, reject) => {
  try {
    let doc;
    const {connector} = connection;

    doc = pick(response, keys(model.fields));

    doc = await convertFieldsForInsert(doc, model);

    if (connector.id) {
      doc[connector.id.name] = response[connector.id.name];
    }

    await didInsert(doc, model);

    resolve(doc);
  } catch (error) {
    reject(error);
  }
});

export default formatPostInsertDocument;
