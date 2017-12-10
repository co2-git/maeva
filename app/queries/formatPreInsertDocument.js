import before from '../hooks/before';
import getType from '../types/getType';

const formatPreInsertDocument = (document, model, options = {}) =>
new Promise(async (resolve, reject) => {
  try {
    let doc = {};
    const fields = [];

    for (const field in model.fields) {
      const type = getType(model.fields[field]);
      if (field in document) {
        doc[field] = type.convert(document[field], options);
      } else if (model.options.default && (field in model.options.default)) {
        doc[field] = type.convert(
          typeof model.options.default[field] === 'function' ?
            model.options.default[field]() : model.options.default[field],
          options
        );
      }
    }

    for (const field in doc) {
      const value = doc[field];
      if (model.options.validate && model.options.validate[field]) {
        if (
          typeof model.options.validate[field] === 'function' &&
          !model.options.validate[field](value)
        ) {
          throw new Error(`Field "${field}" failed to validate "${value}"`);
        }
        if (
          model.options.validate[field] instanceof RegExp &&
          !model.options.validate[field].test(value)
        ) {
          throw new Error(`Field "${field}" did not match "${value}"`);
        }
      }
    }

    doc = await before('insert', doc, model);

    for (const field in doc) {
      const type = getType(model.fields[field]);
      fields.push({
        field,
        type: type.name,
        value: type.print(doc[field]),
      });
    }

    resolve(fields);
  } catch (error) {
    reject(error);
  }
});

export default formatPreInsertDocument;
