// @flow
import Type from './types/Type';
import associate from './types/associate';
import {MaevaFieldError} from './Error';

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

    if (!this.validateValue(convertedValue)) {
      throw new MaevaFieldError(
        'Field value rejected by type',
        {
          field: this,
          value,
        }
      );
    }
  }

  required(): Field {
    this.attributes.required = true;
    return this;
  }

  toJSON() {
    return {
      type: this.type.name,
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
