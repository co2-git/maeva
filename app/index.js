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

export {default as default} from './src/Connection';
export {default as Model} from './src/Model';
export {default as type} from './src/helpers/type';

export const {version} = packageJSON;
