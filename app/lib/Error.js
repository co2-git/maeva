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

  static FORMAT_VALUE_ERROR = class extends MaevaError {
    constructor(field: MaevaField, value: any) {
      super('FORMAT_VALUE_ERROR');
      this.debug = {field, value};
      const strField = JSON.stringify(field.toJSON(), null, 2);
      const strValue = JSON.stringify(value, null, 2);
      this.message =
        `FORMAT_VALUE_ERROR {field: ${strField}, value: ${strValue}}`;
    }
  }

  static SET_FIELD_ERROR = class extends MaevaError {
    constructor(fieldName: string, value: any, field: ?Field, error: ?Error) {
      super('SET_FIELD_ERROR');
      this.debug = {field, value};
      const strField = field ?
        JSON.stringify(field.toJSON(), null, 2) :
        'undefined';
      const strValue = JSON.stringify(value, null, 2);
      this.message =
        `SET_FIELD_ERROR {field: {${fieldName}: ${strField}},` +
        ` value: ${strValue}}`;
      this.previousError = error;
    }
  }

  code: string;
  debug: Object = {};
  previousError: ?Error;

  constructor(
    code: string,
  ) {
    super('MaevaError');
    this.code = code;
  }
}

export class MaevaFieldError extends MaevaError {}
