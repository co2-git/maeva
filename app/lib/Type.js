// @flow
import MungoObject from './Type/Object';
import MungoArray from './Type/Array';
import MungoNumber from './Type/Number';
import MungoString from './Type/String';
import MungoBoolean from './Type/Boolean';

export default class Type {
  static Object = MungoObject;
  static Array = MungoArray;
  static Number = MungoNumber;
  static String = MungoString;
  static Boolean = MungoBoolean;
}
