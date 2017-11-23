// @flow

declare type _MaevaHook = (
  document: Object,
  model: MaevaModel
) => Promise<Object>;

declare type MaevaHook = {|
  +insert?: _MaevaHook | _MaevaHook[],
  +remove?: _MaevaHook | _MaevaHook[],
  +update?: _MaevaHook | _MaevaHook[],
|};
