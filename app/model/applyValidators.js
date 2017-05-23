// @flow
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
        throw new Error('Field validator fails');
      }
    }
  }

  return {
    ...doc,
    ...converted
  };
};

export default applyValidators;
