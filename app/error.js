// @flow

const error = (fn: string, message: string, debug: Object = {}) => {
  let err = new Error(`${fn}(): ${message}`);
  Object.assign(err, {name: 'MaevaError'}, debug);
  return err;
};

export default error;
