// @flow

declare type MaevaFieldAbstract = MaevaType | {
  type: MaevaType,

  default?: Function | any,
  index?: MaevaIndexAbstract,
  many?: MaevaField,
  mixed: MaevaField[],
  required?: boolean,
  shape?: {[fieldName: MaevaFieldName]: MaevaField},
  tuple?: MaevaField[],
  validate?: RegExp | Function,
  unique?: MaevaIndexAbstract,
};

declare interface MaevaType {
  convert: (value: any) => any,
  validate: (value: any) => boolean,
}

declare class MaevaField<MaevaFieldAbstract> {
  default?: Function | any,
  index?: boolean,
  many?: MaevaIndexAbstract,
  mixed: MaevaType[],
  required?: boolean,
  shape?: {[fieldName: MaevaFieldName]: typeof MaevaField},
  tuple?: MaevaType[],
  type: MaevaType,
  validate?: RegExp | Function,
  unique: MaevaIndexAbstract,
}

declare interface MaevaModel {
  findOne: (...query: [MaevaFindQuery]) => Promise<MaevaFindResponse>,
  findMany: (...query: [MaevaFindQuery]) => Promise<MaevaFindResponse[]>,
}
