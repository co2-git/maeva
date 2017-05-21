// @flow
import isString from 'lodash/isString';
export default class MaevaModel {

  name: string;
  fields: {[field: string]: Function | Type} = {};
  required: ?string[] = [];
  defaults: {[field: string]: MaevaDefault} = {};
  validate: {[field: string]: RegExp | (value: any) => boolean} = {};

  constructor(args: Object) {
    Object.assign(this, args);

    if (!isString(this.name) || !this.name) {
      throw new Error('MaevaModel is missing name');
    }
  }

}
