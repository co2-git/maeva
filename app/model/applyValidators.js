// @flow
import maevaError from '../error';

export type DataValidator = RegExp | (value: any) => boolean;

const applyValidators = (doc: Object, model: Object) => {
  const converted = {};

  let field: string;

  for (field in model.fields) {
    if ((field in model.validate)) {
      const validator: DataValidator = model.validate[field];
      if (
        (typeof validator === 'function' && !validator(doc[field])) ||
        (validator instanceof RegExp && !validator.test(doc[field]))
      ) {
        throw maevaError(
          'applyValidators',
          `Field validator fails for field "${field}" of model "${model.name}"`,
          {doc, model, field, value: doc[field]},
        );
      }
    }
  }

  return {
    ...doc,
    ...converted
  };
};

export default applyValidators;
