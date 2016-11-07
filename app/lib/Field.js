// @flow

import _ from 'lodash';
import * as Type from './Type';
import * as Schema from './Schema';
import MaevaError from './Error';

export default class Field {
  validator: ?Function;
  $type: Function;
  type: Function;
  required: ?boolean;
  default: ?any;
  constructor(field: Object) {
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
  associate(): Function {
    try {
      if (typeof Schema === 'function' && this.type instanceof Schema) {
        return Schema;
      }
      return Type.associate(this.type);
    } catch (error) {
      throw new MaevaError(
        error,
        this,
        this.associate,
      );
    }
  }
  convert(value: any): any {
    return this.$type.convert(value);
  }
  validate(value: any): boolean {
    return this.$type.validate(value);
  }
  set(value: any): any {
    return this.$type.set(value);
  }
  toJSON(): $Field$JSON {
    const json = {
      ..._.omit(this, ['$type']),
      type: this.type.name,
    };
    if (typeof json.default === 'function') {
      json.default = json.default.toString();
    }
    if (typeof json.validate === 'function') {
      json.validate = json.validate.toString();
    }
    if (json.type === 'maevaEmbeddedSchema') {
      json.embeddedSchema = this.type.embeddedSchema.toJSON();
    }
    if (json.type === 'maevaArray') {
      json.arrayOf = this.type.type.name;
    }
    return json;
  }
  isRequired(): boolean {
    return this.required === true;
  }
  hasDefault(): boolean {
    return ('default' in this);
  }
  hasValidator(): boolean {
    return ('validator' in this);
  }
  isLink(): boolean {
    return this.type.isMaevaModel;
  }
  isEmbedded(): boolean {
    return this.type.isEmbeddedSchema;
  }
}
