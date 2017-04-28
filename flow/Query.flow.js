// @flow

declare type MaevaQueryProjection = {
  limit?: number,
  offset?: number,
  sortBy?: MaevaSortBy
};

declare type MaevaQueryOne = {
  conn?: MaevaConnection,
  get?: Model,
  model: Function,
  projection?: MaevaQueryProjection,
  set?: Object,
  unset?: Object,
};

declare type MaevaQueryMany = {
  conn?: MaevaConnection,
  get?: Object[],
  model: MaevaModelJSON,
  projection?: {
    limit: number,
    offset: number,
    sortBy: MaevaSortBy
  },
  set?: Object[],
  unset?: Object[],
};
