// @flow
import Type from './types/Type';
import associate from './types/associate';

export default class Field {

  attributes: MaevaFieldAttributes = {
    required: false,
  };

  type: Type;

  constructor(type: Function | Type) {
    if (type instanceof Type) {
      this.type = type;
    } else {
      this.type = associate(type);
    }
  }

  convertValue(value: any): any {
    return this.type.convert(value);
  }

  default(defaultValue: Function | any): Field {
    this.attributes.default = defaultValue;
    return this;
  }

  formatValue(value: any): any {
    const convertedValue = this.convertValue(value);

    if (this.validateValue(convertedValue)) {
      return convertedValue;
    }

    return null;
  }

  getDefaultValue(): any {
    if (this.hasDefault()) {
      if (typeof this.attributes.default === 'function') {
        return this.attributes.default();
      }
      return this.attributes.default;
    }
    return null;
  }

  hasDefault(): boolean {
    return ('default' in this.attributes);
  }

  index(): Field {
    return this;
  }

  required(): Field {
    this.attributes.required = true;
    return this;
  }

  toJSON() {
    return {
      type: this.type.toJSON(),
      ...this.attributes,
    };
  }

  unique(): Field {
    return this;
  }

  validate(validateValue: Function | any): Field {
    this.attributes.validate = validateValue;
    return this;
  }

  validateValue(value: any): boolean {
    return this.type.validate(value);
  }

}
