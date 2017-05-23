// @flow
import MaevaTypeString from './type/String';
import MaevaTypeNumber from './type/Number';
import MaevaTypeBoolean from './type/Boolean';
import MaevaTypeDate from './type/Date';
import MaevaType from './type/Type';

export type DataTypeCandidate = Function | DataType;

export default function getType(type: DataTypeCandidate): MaevaType {
  if (type instanceof MaevaType) {
    return type;
  }
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
