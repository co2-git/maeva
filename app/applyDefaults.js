// @flow
import isFunction from 'lodash/isFunction';

const applyDefaults = (document: Object, model: Object) => {
  const defaults = {};

  let field: string;

  for (field in model.fields) {
    if (!(field in document) && (field in model.defaults)) {
      const defaultValue = model.defaults[field];
      defaults[field] = isFunction(defaultValue) ?
        defaultValue() : defaultValue;
    } else if (field in document) {
      defaults[field] = document[field];
    }
  }

  return {
    ...document,
    ...defaults,
  };
};

export default applyDefaults;
