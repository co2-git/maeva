import * as Type from './Type';
import * as Schema from './Schema';
import MaevaError from './Error';

export default class Field {
  constructor(field) {
    for (const attribute in field) {
      if (attribute === 'validate') {
        Object.assign(this, {validator: field.validate});
      } else {
        Object.assign(this, {[attribute]: field[attribute]});
      }
    }
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
  convert(value): any {
    return this.$type.convert(value);
  }
  validate(value): boolean {
    return this.$type.validate(value);
  }
  set(value): any {
    return this.$type.set(value);
  }
  toJSON(): Object {
    const json = {
      ...this,
      type: this.type.name,
    };
    if (typeof json.default === 'function') {
      json.default = json.default.toString();
    }
    if (json.type === 'maevaEmbeddedSchema') {
      json.embeddedSchema = this.type.embeddedSchema.toJSON();
    }
    if (json.type === 'maevaArray') {
      json.arrayOf = this.type.type.name;
    }
    return json;
  }
}
