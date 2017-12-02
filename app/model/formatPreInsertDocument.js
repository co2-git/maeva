import pick from 'lodash/pick';
import keys from 'lodash/keys';
import includes from 'lodash/includes';

import applyDefault from './applyDefault';
import applyValidators from './applyValidators';
import convertFields from './convertFields';
import maevaError from '../error';
import validateFields from './validateFields';
import willInsert from './willInsert';

const formatPreInsertDocument = (model, document, connection) =>
new Promise(async (resolve, reject) => {
  try {
    let doc;
    const {connector} = connection;

    doc = pick(document, keys(model.fields));

    doc = applyDefault(doc, model);

    doc = await convertFields(doc, model, {connector});

    doc = applyValidators(doc, model);

    await validateFields(doc, model, {connector});

    for (const field in model.fields) {
      if (!(field in doc) && includes(model.options.required, field)) {
        throw maevaError(
          'insertOne',
          'Missing required field',
          {field, model, document: doc}
        );
      }
    }

    doc = await willInsert(doc, model);

    resolve(doc);
  } catch (error) {
    reject(error);
  }
});

export default formatPreInsertDocument;
