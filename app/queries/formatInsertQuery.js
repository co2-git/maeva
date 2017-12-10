import getType from '../types/getType';
import formatInsertQueryValue from './formatInsertQueryValue';

const formatInsertQuery = (document, model, options = {}) => {
  const documents = [];
  for (const field in document) {
    if (field in model.fields) {
      const type = getType(model.fields[field]);
      documents.push({
        field,
        value: type.convert(document[field], options),
        type: type.name,
      });
    }
  }
  return documents;
};

export default formatInsertQuery;
