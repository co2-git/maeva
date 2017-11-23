// @flow
import getType from '../types/getType';

const validateFields = (doc: Object, model: MaevaModel) => {
  let field: string;

  for (field in model.fields) {
    const type = getType(model.fields[field]);
    type.validate(doc[field]);
  }
};

export default validateFields;
