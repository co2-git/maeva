// @flow
import isString from 'lodash/isString';

export default class DataModel {

  defaults: {[field: string]: DataDefault} = {};

  did: {
    insert?: Promise<*>,
    remove?: Promise<*>,
    update?: Promise<*>,
  } = {};

  fields: {[field: string]: DataTypeCandidate} = {};

  name: string;

  required: ?string[] = [];

  validate: {[field: string]: DataValidator} = {};

  will: {
    insert?: Promise<*>,
    remove?: Promise<*>,
    update?: Promise<*>,
  } = {};

  constructor(name: string, fields: Object = {}, options: Object = {}) {
    this.name = name;
    this.fields = fields;
    this.required = options.required || [];
    this.defaults = options.defaults || {};
    this.validate = options.validate || {};

    if (!isString(this.name) || !this.name) {
      throw new Error('DataModel is missing name');
    }
  }

}
