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

import packageJSON from '../package.json';

export {default as default} from './lib/Connection';
export {default as Model} from './lib/Model';
export {default as type} from './lib/helpers/type';

export const {version} = packageJSON;
