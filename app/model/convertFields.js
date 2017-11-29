// @flow
import getType from '../types/getType';

const convertFields = (doc: Object, model: MaevaModel, options = {}) => {
  const converted = {};

  let field: string;

  for (field in model.fields) {
    if ((field in doc)) {
      const type = getType(model.fields[field]);
      converted[field] = type.convert(doc[field], options);
    }
  }

  return {
    ...doc,
    ...converted
  };
};

export default convertFields;
