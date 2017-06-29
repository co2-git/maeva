// @flow
export default class DataModel {

  static ERROR_MISSING_VALID_NAME = 'ERROR_MISSING_VALID_NAME';
  static ERROR_MISSING_VALID_FIELDS = 'ERROR_MISSING_VALID_FIELDS';

  after: {
    insert?: Promise<*>,
    remove?: Promise<*>,
    update?: Promise<*>,
  } = {};

  before: {
    insert?: Promise<*>,
    remove?: Promise<*>,
    update?: Promise<*>,
  } = {};

  default: {[field: string]: DataDefault} = {};

  fields: {[field: string]: DataTypeCandidate} = {};

  name: string;

  required: ?string[] = [];

  validate: {[field: string]: DataValidator} = {};

  constructor(name: string, fields: Object = {}, options: Object = {}) {
    if (typeof name === 'string' && name) {
      this.name = name;
    } else {
      throw new Error(DataModel.ERROR_MISSING_VALID_NAME);
    }
    if (typeof fields === 'object' && fields) {
      this.fields = fields;
    } else {
      throw new Error(DataModel.ERROR_MISSING_VALID_FIELDS);
    }
    if (options.required && Array.isArray(options.required)) {
      this.required = options.required;
    }
    if (options.default && typeof fields === 'object') {
      this.default = options.default;
    }
    if (options.validate && typeof fields === 'object') {
      this.validate = options.validate;
    }
  }

}
