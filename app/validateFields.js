// @flow
import getType from './getType';

const validateFields = (doc: Object, model: Object) => {
  const validated = {};

  let field: string;

  for (field in model.fields) {
    const type = getType(model.fields[field]);
    if (type.validate(doc[field])) {
      validated[field] = doc[field];
    }
  }

  return validated;
};

export default validateFields;
