// @flow
import getType from '../types/getType';

const convertFields = async (doc: Object, model: MaevaModel, options = {}) => {
  const converted = {};

  let field: string;

  for (field in model.fields) {
    if ((field in doc)) {
      const type = getType(model.fields[field]);
      const convertedField = type.convert(doc[field], options);
      if (convertedField instanceof Promise) {
        try {
          converted[field] = await convertedField;
        } catch (error) {
          converted[field] = doc[field];
        }
      } else {
        converted[field] = convertedField;
      }
    }
  }

  return {
    ...doc,
    ...converted
  };
};

export default convertFields;
