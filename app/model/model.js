import keys from 'lodash/keys';

const model = (name, fields = {}, options = {}, helpers = {}) => {
  const _model = {fields, name, options, helpers};

  if (typeof name !== 'string' || !name) {
    throw new Error('ERROR_MISSING_VALID_NAME');
  }
  if (typeof fields !== 'object' || fields === null) {
    _model.fields = {};
  }
  if (typeof options !== 'object' || options === null) {
    _model.options = {};
  }
  if (typeof helpers !== 'object' || helpers === null) {
    _model.helpers = {};
  }

  return _model;
};

export default model;
