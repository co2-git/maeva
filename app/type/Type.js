// @flow

export default class MaevaType {

  flags = [];
  name = 'Type';

  convert(value: any): any {
    return value;
  }

  validate(): boolean {
    return true;
  }

  toJSON(): Object {
    return {
      name: this.name,
      flags: this.flags,
    };
  }

}
