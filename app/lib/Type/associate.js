// @flow
import MaevaError from '../Error';
import _Number from './Number';
import _String from './String';
import _Boolean from './Boolean';
import _Date from './Date';

export default
function associate(type: Function): Function {
  switch (type) {
  case Number: return _Number;
  case String: return _String;
  case Boolean: return _Boolean;
  case Date: return _Date;
  default: throw new MaevaError('Could not associate type', {type});
  }
}
