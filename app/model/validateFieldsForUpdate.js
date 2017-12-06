import getType from '../types/getType';
import isPrimitive from '../types/isPrimitive';

const validateFields = async (doc, model, options) => {
  let field;

  for (field in doc) {
    const type = getType(model.fields[field]);
    const value = doc[field];
    if (isPrimitive(value)) {
      const validated = type.validate(doc[field], options);
      if (validated instanceof Promise) {
        try {
          await validated;
        } catch (error) {
          throw error;
        }
      }
    } else {

    }
  }
};

export default validateFields;
