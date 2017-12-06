const model = (name, fields = {}, options = {}) => {
  const _model = {fields, name, options};

  if (typeof name !== 'string' || !name) {
    throw new Error('ERROR_MISSING_VALID_NAME');
  }
  if (typeof fields !== 'object' || fields === null) {
    _model.fields = {};
  }
  if (typeof options !== 'object' || options === null) {
    _model.options = {};
  }

  return _model;
};

export default model;
