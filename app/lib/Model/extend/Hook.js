/**
 *  ****************************************************************************
 *  @module maeva
 *  @name name
 *  @description description
 *  @type type
 *  @license ISC
 *  @author francois https://github.com/co2-git
 *  @flow
 *  ****************************************************************************
**/

import ModelInfo from './Info';

export default class ModelHook extends ModelInfo {
  static inserting(): Array<(model: $Model) => Promise<*>> {
    return [];
  }
  static inserted(): Array<(model: $Model) => Promise<*>> {
    return [];
  }
  static updating() {
    return [];
  }
  static updated() {
    return [];
  }
  static removing() {
    return [];
  }
  static removed() {
    return [];
  }
}
