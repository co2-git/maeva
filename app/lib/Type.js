// @flow
import _Number from './Type/Number';
import _String from './Type/String';
import _Boolean from './Type/Boolean';
import _Date from './Type/Date';

export default class Type {
  static Number = _Number;
  static String = _String;
  static Boolean = _Boolean;
  static Date = _Date;
}
