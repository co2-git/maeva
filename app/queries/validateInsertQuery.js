import getType from '../types/getType';

const validateInsertQuery = (doc, model, options) => {
  for (const field in doc) {
    const type = getType(model.fields[field]);
    const value = doc[field];
    type.validate(value, options);
  }
};

export default validateInsertQuery;
