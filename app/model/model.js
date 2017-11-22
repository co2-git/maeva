// @flow

const model: MaevaModelMaker = (
  name: string,
  fields: MaevaSchema = {},
  options: MaevaModelOptions = {},
): MaevaModel => {
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
