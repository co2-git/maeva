// @flow

declare type MaevaFieldAbstract = {
  [model: string]: Function,
  Array?: Function,
  Boolean?: Function,
  Date?: Function,
  default?: Function | any,
  enum?: any[],
  Mixed?: Function[],
  Number?: Function,
  Object?: {[field: string]: MaevaFieldAbstract},
  required?: boolean,
  String?: Function,
  Tuple?: Function[],
  type?: 'any',
  validate?: RegExp | Function,
};
