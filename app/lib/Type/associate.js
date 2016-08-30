// @flow
import MaevaError from '../Error';
import MungoObject from './Object';
import MungoArray from './Array';
import MungoNumber from './Number';
import MungoString from './String';
import MungoBoolean from './Boolean';

export default
function associate(type: Function): Function {
  switch (type) {
  case Object: return MungoObject;
  case Array: return MungoArray;
  case Number: return MungoNumber;
  case String: return MungoString;
  case Boolean: return MungoBoolean;
  default: throw new MaevaError('Could not associate type', {type});
  }
}
