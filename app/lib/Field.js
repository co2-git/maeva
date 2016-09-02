import Type from './Type';
import MaevaError from './Error';

export default class Field {
  required = false;
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
      return Type.associate(this.type);
    } catch (error) {
      throw MaevaError.rethrow(
        error,
        'Could not associate field type',
        {field: this, code: MaevaError.FAILED_ASSOCIATING__FIELD_TYPE},
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
