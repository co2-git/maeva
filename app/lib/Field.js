import Type from './Type';
export default class Field {
  required = false;
  constructor(field) {
    Object.assign(this, field);
    Object.defineProperties(this, {
      $type: {
        enumerable: false,
        value: Type.associate(this.type),
      },
    });
  }
  convert(value) {
    return this.$type.convert(value);
  }
  validate(value) {
    return this.$type.validate(value);
  }
}
