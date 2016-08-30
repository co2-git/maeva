// @flow

class ExtendableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default class MungoError extends ExtendableError {
  static MISSING_REQUIRED_FIELD = 1;
  static DISTINCT_ARRAY_CONSTRAINT = 2;
  static COLLECTION_NOT_FOUND = 3;

  static rethrow(
      error: Error,
      message: string,
      options: Object = {}
    ): MungoError {
    options.error = {};
    if (error instanceof this) {
      options.error = {
        ...error,
        message: error.originalMessage,
        stack: error.stack.split(/\n/),
      };
    } else {
      options.error = {
        ...error,
        stack: error.stack.split(/\n/),
      };
    }
    return new MungoError(message, options);
  }

  message: string;
  originalMessage: string;
  code: number | string;
  options: Object;

  constructor(message: string, options: Object = {}) {
    super(message);
    let msg: string = message;
    try {
      msg = JSON.stringify({message, options}, null, 2);
    } catch (error) {
      msg = message;
    } finally {
      super(msg);
    }
    this.originalMessage = message;
    if ('code' in options) {
      this.code = options.code;
    }
    this.options = options;
  }
}
