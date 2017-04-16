/**
 *  ****************************************************************************
 *  @module maeva
 *  @name MaevaTypeAssociater
 *  @description description
 *  @author francois
 *  @license MIT
 *  @type function
 *  @flow
 *  ****************************************************************************
**/

import MaevaError from '../Error';
import _Number from './Number';
import _String from './String';
import _Boolean from './Boolean';
import _Date from './Date';
import _Error from './Error';
import _RegExp from './RegExp';

export default function associate(type: Function): Function {
  switch (type) {
  case Number: return _Number;
  case String: return _String;
  case Boolean: return _Boolean;
  case Date: return _Date;
  case RegExp: return _RegExp;
  case Error: return _Error;
  default: {
    if (!type.validate || !type.convert || !type.set) {
      throw new MaevaError(
        'Could not associate type (it lacks validator, convertor or setter)',
        MaevaError.FAILED_ASSOCIATING_TYPE,
        type,
      );
    }
    return type;
  }
  }
}
