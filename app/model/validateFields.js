// @flow
import getType from '../types/getType';

const validateFields = async (doc: Object, model: MaevaModel, options) => {
  let field: string;

  for (field in model.fields) {
    const type = getType(model.fields[field]);
    const validated = type.validate(doc[field], options);
    if (validated instanceof Promise) {
      try {
        await validated;
      } catch (error) {
        throw error;
      }
    }
  }
};

export default validateFields;
