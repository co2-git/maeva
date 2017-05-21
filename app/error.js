// @flow

const error = (fn: string, message: string, debug: Object = {}) => {
  let err = new Error(`${fn}(): ${message}`);
  Object.assign(err, debug);
  return err;
};

export default error;
