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
  static FAILED_ASSOCIATING__FIELD_TYPE = 5;
  static rethrow(error: Error, message: string, options: Object = {}
  ): MaevaError {
    return new MaevaError(message, {...options, error});
  }

  message: string;
  code: number | string;
  options: Object = {};
  previous: ?Error;

  constructor(message: string, options: Object = {}) {
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
