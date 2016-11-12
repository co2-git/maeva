/**
 *  ****************************************************************************
 *  @module maeva
 *  @name index
 *  @description npm module
 *  @type object
 *  @license ISC
 *  @author francois https://github.com/co2-git
 *  @flow
 *  ****************************************************************************
**/

export {default as default} from './lib/Connection';
export {default as Model} from './lib/Model';
export {default as Schema} from './lib/Schema';
import * as Type from './lib/Type';
export {Type};
import packageJSON from '../package.json';
export const {version} = packageJSON;
