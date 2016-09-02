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

export default class MaevaError extends ExtendableError {
  static rethrow(error: Error, message: string, options: Object = {}
  ): MaevaError {
    return new MaevaError(message, {...options, error});
  }

  message: string;
  code: number | string;
  options: Object = {};
  previous: ?Error;

  constructor(message: string, options: Object = {}) {
    super(message);
    if ('code' in options) {
      this.code = options.code;
    }
    if ('error' in options) {
      this.previous = options.error;
    }
    this.options = _.omit(options, ['code', 'error']);
  }
}
