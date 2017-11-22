// @flow
import maevaError from '../error';

const applyValidators = (doc: Object, model: MaevaModel) => {
  const converted = {};

  let field: string;

  for (field in model.fields) {
    if (model.options.validate && (field in model.options.validate)) {
      const validator = model.options.validate[field];
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
