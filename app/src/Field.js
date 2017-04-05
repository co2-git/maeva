// @flow
import Type from './Type';
import {MaevaFieldError} from './Error';

const _type = (type: MaevaFieldConstructor) => new Field(type);

_type.object = (type: MaevaFieldConstructor) => new Field(new Type.Object(type));
_type.array = (type: MaevaFieldConstructor) => new Field(new Type.Array(type));
_type.tuple = (...types: [MaevaFieldConstructor]) => new Field(
  new Type.Tuple(...types)
);
_type.mixed = (...types: [MaevaFieldConstructor]) => new Field(
  new Type.Mixed(...types)
);
_type.any = () => new Field(new Type.Any());

export default class Field {

  attributes: MaevaFieldAttributes = {
    required: false,
  };

  type: any;

  constructor(type: MaevaFieldConstructor) {
    this.type = Type.associate(type);
  }

  required(): Field {
    this.attributes.required = true;
    return this;
  }

  default(defaultValue: Function | any): Field {
    this.attributes.default = defaultValue;
    return this;
  }

  validate(validateValue: Function | any): Field {
    this.attributes.validate = validateValue;
    return this;
  }

  convertValue(value: any): any {
    return this.type.convert(value);
  }

  validateValue(value: any): boolean {
    return this.type.validate(value);
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

}
