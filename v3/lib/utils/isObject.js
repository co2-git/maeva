/**
 *  ****************************************************************************
 *  @module module
 *  @name name
 *  @description description
 *  @author francois
 *  @license MIT
 *  @type function
 *  @flow
 *  ****************************************************************************
**/

import _ from 'lodash';

export default function isObject(object: any): boolean {
  return Boolean(object && _.isObject(object) && !_.isArray(object));
}
