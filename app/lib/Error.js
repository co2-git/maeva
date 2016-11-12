/**
 *  ****************************************************************************
 *  @module module
 *  @name name
 *  @description description
 *  @author francois
 *  @license MIT
 *  @type function
 *  @flow
 *  ****************************************************************************
**/

import Model from './Model';
import Schema from './Schema';
import Field from './Field';

type $message = string
| Error
| Model
| Schema
| Field
| number
| Function;

class ExtendableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default class MaevaError extends ExtendableError {
  static FAILED_ASSOCIATING_TYPE = 0;
  static COULD_NOT_SET_VALUE_TO_TYPE = 1;
  static FAILED_BUILDING_SCHEMA_FIELD = 2;
  static JAVASCRIPT_NATIVE_OBJECTS_ARE_NOT_SCHEMAS = 4;
  static COULD_NOT_FIND_FIELD_IN_SCHEMA = 5;
  static MISSING_REQUIRED_FIELD = 6;
  static FIELD_VALIDATOR_FAILED = 7;
  code: ?number;
  error: ?Error;
  documents: ?Model[] = [];
  document: ?Model;
  schema: ?Schema;
  field: ?Field;
  stackToArray: string[] = [];
  options: {} = {};
  type: ?Function;
  model: ?Function;
  constructor(...messages: $message[]) {
    let _message = '',
      code,
      error,
      stack = [],
      document,
      documents = [],
      schema,
      field,
      type,
      model,
      options = {};

    for (const message of messages) {
      if (typeof message === 'string') {
        _message = message;
      } else if (typeof message === 'number') {
        code = message;
      } else if (typeof message === 'function') {
        if (message.isMaevaModel) {
          model = message;
        } else {
          type = message;
        }
      } else if (message instanceof Error) {
        error = message;
      } else if (message instanceof Model) {
        document = message;
      } else if (message instanceof Schema) {
        schema = message;
      } else if (message instanceof Field) {
        field = message;
      } else if (Array.isArray(message)) {
        documents = message;
      } else if (typeof message === 'object') {
        options = message;
      }
    }
    if (error && error.stack) {
      stack = error.stack.split(/\n/);
    }
    let errorMessage = '';
    if (error) {
      errorMessage += `[${error.name}] `;
    }
    if (_message) {
      errorMessage += _message;
    } else if (error) {
      errorMessage += error.message;
    }
    if (stack[1]) {
      errorMessage += ` ${stack[1].trim()}`;
    }
    const debug = {
      code,
      options,
      type: type && type.name,
      document: document && document.toJSON(),
      documents: documents.length ? documents.map(doc => doc.toJSON()) : [],
      schema: schema && schema.toJSON(),
      field: field && field.toJSON(),
      model: model && model._getInfo(),
    };
    if (!debug.documents.length) {
      delete debug.documents;
    }
    if (!Object.keys(debug.options).length) {
      delete debug.options;
    }
    super(errorMessage + ' ' + JSON.stringify(debug));
    this.error = error;
    this.code = code;
    this.options = options;
    this.type = type;
    this.stackToArray = stack;
    this.document = document;
    this.documents = documents;
    this.schema = schema;
    this.field = field;
  }
}
