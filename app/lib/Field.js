import * as Type from './Type';
import * as Schema from './Schema';
import MaevaError from './Error';

export default class Field {
  constructor(field) {
    Object.assign(this, field);
    Object.defineProperties(this, {
      $type: {
        enumerable: false,
        value: this.associate(),
      },
    });
  }
  associate() {
    try {
      if (typeof Schema === 'function' && this.type instanceof Schema) {
        return Schema;
      }
      return Type.associate(this.type);
    } catch (error) {
      throw MaevaError.rethrow(
        error,
        'Could not associate field type',
        {
          field: this,
          code: MaevaError.FAILED_ASSOCIATING_FIELD_TYPE,
          foo: 1,
          errorMessage: error.message,
          errorStack: error.stack.split(/\n/),
        },
      );
    }
  }
  convert(value) {
    return this.$type.convert(value);
  }
  validate(value) {
    return this.$type.validate(value);
  }
}
