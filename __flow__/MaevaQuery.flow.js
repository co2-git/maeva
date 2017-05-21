// @flow

declare type MaevaQuery = {
  connection?: MaevaConnection,
  model: MaevaModel,
  get?: Object | Object[],
  set?: Object | Object[],
  unset?: Object | Object[],
  projection?: MaevaProjection,
};
