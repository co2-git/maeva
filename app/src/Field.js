// @flow
import Type from './Type';
import {MaevaFieldError} from './Error';

export default class Field {

  default: ?any;
  required: boolean = false;
  type: any;
  validate: ?Function;
  array: ?Type.Array;
  tuple: ?Type.Tuple;
  mixed: ?Type.Mixed;
  object: ?Type.Object;
  any: ?Type.Any;
  enum: ?Type.Enum;

  constructor(abstract: MaevaFieldAbstract) {
    for (const key in abstract) {
      switch (key) {

      case 'required': {
        this.required = abstract.required;
      } break;

      case 'default': {
        this.default = abstract.default;
      } break;

      case 'validate': {
        this.validate = abstract.validate;
      } break;

      case 'String': {
        this.type = new Type.String();
      } break;

      case 'Number': {
        this.type = new Type.Number();
      } break;

      case 'Boolean': {
        this.type = new Type.Boolean();
      } break;

      case 'Date': {
        this.type = new Type.Date();
      } break;

      case 'Array': {
        this.type = new Type.Array(abstract.Array[0]);
      } break;

      case 'Tuple': {
        this.type = new Type.Tuple(...abstract.Tuple);
      } break;

      case 'Mixed': {
        this.type = new Type.Mixed(...abstract.Mixed);
      } break;

      case 'Object': {
        const object = {};
        for (const field in abstract.Object) {
          object[field] = new Field(abstract.Object[field]);
        }
        this.type = new Type.Object(object);
      } break;

      case 'type': {
        this.type = new Type.Any();
      } break;

      case 'enum': {
        this.type = new Type.Enum(...abstract.enum);
      } break;

      default: {
        this.type = new Type.Model(abstract[key]);
      } break;

      }
    }
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
