// @flow
import MaevaError from '../Error';
import _Number from './Number';
import _String from './String';
import _Boolean from './Boolean';
import _Date from './Date';

export default function associate(type: Function): Function {
  switch (type) {
  case Number: return _Number;
  case String: return _String;
  case Boolean: return _Boolean;
  case Date: return _Date;
  default: {
    if (!type.validate || !type.convert) {
      let typeName;
      if (typeof type === 'function') {
        typeName = type.name;
      } else {
        typeName = 'Not A Function!';
      }
      throw new MaevaError('Could not associate type', {
        type: typeName,
        code: MaevaError.FAILED_ASSOCIATING_TYPE,
      });
    }
    return type;
  }
  }
}
