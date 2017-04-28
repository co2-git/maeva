// @flow
import MaevaTypeString from './String';
import MaevaTypeNumber from './Number';
import MaevaTypeBoolean from './Boolean';
import MaevaTypeDate from './Date';

export default function associate(type: Function): Type {
  switch (type) {
  case String:
    return new MaevaTypeString();
  case Number:
    return new MaevaTypeNumber();
  case Boolean:
    return new MaevaTypeBoolean();
  case Date:
    return new MaevaTypeDate();
  default:
    return type;
  }
}
