// @flow
import isFunction from 'lodash/isFunction';

export type DataDefault = Function | any;

const applyDefault = (document: Object, model: Object) => {
  const defaults = {};

  let field: string;

  for (field in model.fields) {
    const missingField = (
      !(field in document) ||
      typeof document[field] === 'undefined' ||
      document[field] === null
    );
    if (missingField && (field in model.default)) {
      const defaultValue = model.default[field];
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

export default applyDefault;
