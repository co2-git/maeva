// @flow
import {every, isArray, map} from 'lodash';
import MaevaType from './defs/MaevaType';
import getType from './getType';

const arrayType = (type: MaevaType) => new MaevaType({

  convert: (array: any): any => (
    (isArray(array) && map(array, getType(type).convert)) ||
    array
  ),

  validate: (array: any): boolean => (
    isArray(array) && every(array, getType(type).validate)
  )

});

export default arrayType;
