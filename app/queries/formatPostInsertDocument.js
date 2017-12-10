import after from '../hooks/after';
import getIdName from '../connect/getIdName';
import getType from '../types/getType';

const formatPostInsertDocument = (response, model, options = {}) =>
new Promise(async (resolve, reject) => {
  try {
    let doc = {};

    for (const field in model.fields) {
      const type = getType(model.fields[field]);
      if (field in response) {
        doc[field] = type.convert(response[field]);
      } else if (model.options.default && (field in model.options.default)) {
        doc[field] = type.convert(
          typeof model.options.default[field] === 'function' ?
            model.options.default[field]() : model.options.default[field]
        );
      }
    }

    const idName = getIdName(options.connectiom);

    doc[idName] = response[idName];

    await after('insert', {...doc}, model);

    resolve(doc);
  } catch (error) {
    reject(error);
  }
});

export default formatPostInsertDocument;
