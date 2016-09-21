// @flow
import _ from 'lodash';

class ExtendableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

function printPreviousErrors(error) {
  const previous = [];
  if (error) {
    previous.push(error.message, ...printPreviousErrors(error.previous));
  }
  return previous;
}

export default class MaevaError extends ExtendableError {
  static FAILED_BUILDING_SCHEMA = 1;
  static FAILED_BUILDING_SCHEMA_FIELD = 2;
  static MISSING_REQUIRED_FIELD = 3;
  static FAILED_ASSOCIATING_TYPE = 4;
  static FAILED_ASSOCIATING_FIELD_TYPE = 5;
  static EXPECTED_A_SCHEMA = 6;
  static COULD_NOT_FIND_FIELD_IN_SCHEMA = 7;
  static EXPECTED_A_FIELD = 8;
  static FIELD_HAS_NO_CONVERTER = 9;
  static FIELD_HAS_NO_VALIDATOR = 10;
  static FAILED_CONVERTING_FIELD_VALUE = 11;
  static INVALID_FIELD_SYNTAX = 12;
  static errorMessages = [
    '',
    'Failed building schema from object',
    'Failed building schema for this field',
    'Missing required field',
    'Failed associating given type (function)' +
      ' with a recognized type (function)',
    'Failed associating type for this field',
    'Expected an instance of Schema',
    'Could not find field in schema',
    'Expected field definition to be an instance of Field',
    'Field has no converter function',
    'Field has no validator function',
    'Failed converting field value according to field type',
    'Object could not be converted to Field for invalid syntax',
  ];
  static rethrow(error: Error, message: string, options: Object = {}
  ): MaevaError {
    return new MaevaError(message, {...options, error});
  }

  message: string;
  code: number | string;
  options: Object = {};
  previous: ?Error;

  constructor(message: string|number, options: Object = {}) {
    if (typeof message === 'number') {
      options.code = message;
      message = MaevaError.errorMessages[message];
    }
    const messages = [
      message,
      '**************************************',
      JSON.stringify(_.omit(options, ['error']), null, 2),
      ...printPreviousErrors(options.error)
    ];
    super(messages.join('\n'));
    if ('code' in options) {
      this.code = options.code;
    }
    if ('error' in options) {
      this.previous = options.error;
    }
    this.options = _.omit(options, ['code', 'error']);
  }
}
