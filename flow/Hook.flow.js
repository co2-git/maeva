// @flow

declare type MaevaHook = {|
  +insert?: Promise | Promise[],
  +remove?: Promise | Promise[],
  +update?: Promise | Promise[],
|};
