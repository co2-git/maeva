import includes from 'lodash/includes';

import applyDefault from '../model/applyDefault';
import applyValidators from '../model/applyValidators';
import beforeInsert from '../hooks/beforeInsert';
import formatInsertQuery from './formatInsertQuery';
import maevaError from '../error';
import pickFields from '../model/pickFields';
import validateInsertQuery from './validateInsertQuery';

const formatPreInsertDocument = (document, model, options = {}) =>
new Promise(async (resolve, reject) => {
  try {
    let doc;

    doc = pickFields(document, model, 'insert');

    doc = applyDefault(doc, model);

    doc = formatInsertQuery(doc, model, options);

    applyValidators(doc, model);

    validateInsertQuery(doc, model, options);

    for (const field in model.fields) {
      if (!(field in doc) && includes(model.options.required, field)) {
        throw maevaError(
          'insertOne',
          `Missing required field "${field}" from model "${model.name}"`,
          {field, model, document: doc}
        );
      }
    }

    doc = await beforeInsert(doc, model);

    resolve(doc);
  } catch (error) {
    reject(error);
  }
});

export default formatPreInsertDocument;
