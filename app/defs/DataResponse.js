// @flow

export default class DataConnectorResponse {

  request: Object;
  response: {
    get: Object[],
    reset: Object[],
    set: Object[],
    unset: Object[],
  };

  constructor(args: Object) {
    Object.assign(this, args);
  }

}
