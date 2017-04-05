// @flow

import Field from '../app/src/Field';

declare type MaevaField = Field;

declare type MaevaFieldConstructor = Function | MaevaField;

declare type MaevaFieldAttributes = {
  required: boolean,
  default?: Function | any,
  validate?: RegExp | Function,
};

declare type MaevaConnectorResponse = {
  set: Object,
  reads: Object[],
  writes: Object[],
};

declare type MaevaResponse = {
  query: {

  },
};
