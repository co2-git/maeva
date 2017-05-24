// @flow

export type DataValueKeys =
  | 'is'
  | 'not'
  | 'above'
  | 'after'
  | 'before'
  | 'below'
  | 'like'
  | 'match'
  ;

export default class DataValue {

  key: DataValueKeys;
  value: any;

  constructor(key: DataValueKeys, value: any) {
    this.key = key;
    this.value = value;
  }

}
