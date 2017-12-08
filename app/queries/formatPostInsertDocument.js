import applyDefault from '../model/applyDefault';
import applyValidators from '../model/applyValidators';
import didInsert from '../model/didInsert';
import formatInsertQuery from './formatInsertQuery';
import getType from '../types/getType';
import pickFields from '../model/pickFields';

const formatPostInsertDocument = (response, model, options = {}) =>
new Promise(async (resolve, reject) => {
  try {
    let doc;
    const {connector} = options.connection;

    doc = pickFields(response, model, 'insert');

    doc = applyDefault(doc, model);

    doc = await formatInsertQuery(doc, model);

    if (connector.id) {
      doc[connector.id.name] = getType(connector.id.type).convert(
        response[connector.id.name]
      );
    }

    applyValidators(doc, model);

    await didInsert({...doc}, model);

    resolve(doc);
  } catch (error) {
    reject(error);
  }
});

export default formatPostInsertDocument;
