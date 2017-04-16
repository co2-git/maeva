// @flow

export class ExtendableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default class MaevaError extends ExtendableError {

  debug: {[field: string]: any} = {};
  previousError: ?Error;

  constructor(
    errorMessage: string,
    errorDebug: ?{[field: string]: any} = {},
    previousError: ?Error,
  ) {
    super(errorMessage);
    this.debug = errorDebug;
    this.previousError = previousError;
  }
}

export class MaevaFieldError extends MaevaError {}
