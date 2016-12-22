// @flow

import ModelHook from './Hook';
import count from '../static/count';
import find from '../static/find';
import findOne from '../static/findOne';
import findById from '../static/findById';
import create from '../static/create';
import remove from '../static/remove';
import removeById from '../static/removeById';
import update from '../static/update';
import updateById from '../static/updateById';

export default class ModelStatement extends ModelHook {
  static create(
    document: $fields | $fields[] = {},
    options: $options = {},
    ): $Model$create {
    return create.apply(this, [document, options]);
  }
  static insert(
    document: $fields | $fields[] = {},
    options: $options = {},
    ): $Model$create {
    return create.apply(this, [document, options]);
  }
  static add(
    document: $fields | $fields[] = {},
    options: $options = {},
    ): $Model$create {
    return create.apply(this, [document, options]);
  }
  static count(
    query: $fields = {},
    options: $options & $get$options = {}): Promise<number> {
    return count.apply(this, [query, options]);
  }
  static find(
    query: $fields = {},
    options: ($options & $get$options) = {limit: 100, skip: 0}
    ): Promise<Model[]> {
    return find.apply(this, [query, options]);
  }
  static get(
    query: $fields = {},
    options: ($options & $get$options) = {limit: 100, skip: 0}
    ): Promise<Model[]> {
    return find.apply(this, [query, options]);
  }
  static findOne(query: $fields = {}, options: $options = {}): Promise<?Model> {
    return findOne.apply(this, [query, options]);
  }
  static getOne(query: $fields = {}, options: $options = {}): Promise<?Model> {
    return findOne.apply(this, [query, options]);
  }
  static findById(
    id: $id,
    options: $options = {}
    ): Promise<?Model> {
    return findById.apply(this, [id, options]);
  }
  static getById(id: $id, options: $options = {}): Promise<?Model> {
    return findById.apply(this, [id, options]);
  }
  static remove(query: $fields, options: $options): Promise<number> {
    return remove.apply(this, [query, options]);
  }
  static delete(query: $fields, options: $options): Promise<number> {
    return remove.apply(this, [query, options]);
  }
  static removeById(id: $id, options: $options): Promise<$id> {
    return removeById.apply(this, [id, options]);
  }
  static deleteById(id: $id, options: $options): Promise<$id> {
    return removeById.apply(this, [id, options]);
  }
  static update(get, set, options) {
    return update.apply(this, [get, set, options]);
  }
  static updateById(id, set, options) {
    return updateById.apply(this, [id, set, options]);
  }
}
