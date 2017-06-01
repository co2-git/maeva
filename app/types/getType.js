// @flow
import string from './string';
import number from './number';
import boolean from './boolean';
import date from './date';
import DataType from '../defs/DataType';

export type DataTypeCandidate = Function | DataType;

export default function getType(type: DataTypeCandidate): DataType {
  if (type instanceof DataType) {
    return type;
  }
  switch (type) {
  case String:
    return string;
  case Number:
    return number;
  case Boolean:
    return boolean;
  case Date:
    return date;
  default:
    return type;
  }
}
