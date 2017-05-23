// @flow
import {every, isArray, map} from 'lodash';
import DataType from '../defs/DataType';
import getType from './getType';

const arrayType = (type: Function | MaevaType) => new MaevaType({

  convert: (array: any): any => (
    (isArray(array) && map(array, getType(type).convert)) ||
    array
  ),

  validate: (array: any): boolean => (
    isArray(array) && every(array, getType(type).validate)
  )

});

export default arrayType;
