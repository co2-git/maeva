// @flow
import getType from '../types/getType';

const convertFields = (doc: Object, model: Object) => {
  const converted = {};

  let field: string;

  for (field in model.fields) {
    const type = getType(model.fields[field]);
    converted[field] = type.convert(doc[field]);
  }

  return {
    ...doc,
    ...converted
  };
};

export default convertFields;
