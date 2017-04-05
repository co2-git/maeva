// @flow
import _String from './Type/String';
import _Number from './Type/Number';
import _Boolean from './Type/Boolean';
import _Date from './Type/Date';
import _Array from './Type/Array';

export default class Type {

  static String = _String;
  static Number = _Number;
  static Boolean = _Boolean;
  static Date = _Date;
  static Array = _Array;

  static associate(type: Function) {
    switch (type) {
    case Number: return _Number;
    case String: return _String;
    case Boolean: return _Boolean;
    case Date: return _Date;
    default: return type;
    }
  }

}
