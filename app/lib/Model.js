// @flow
import clone from 'lodash/clone';
import StaticModel from './Model/StaticModel';
import Field from './Field';
import Connection from './Connection';
import MaevaError from './Error';

export default class Model extends StaticModel {

  changes: {[field: string]: Field} = {};
  fields: {[field: string]: Field} = {};
  id: any;
  isNew: boolean = true;
  schema: MaevaSchema;

  constructor(document: Object = {}, isNew: boolean = true) {
    super();
    this.isNew = isNew;
    this.schema = this.getModel().schema;
    const setter = {};
    for (const field in this.schema) {
      setter[field] = document[field];
    }
    this.set(setter);
  }

  find() {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.getModel().findOne(this));
      } catch (error) {
        reject(error);
      }
    });
  }

  get(field: string) {
    return this.fields[field];
  }

  getModel = () => this.constructor;

  insert() {
    return new Promise(async (resolve, reject) => {
      try {
        const model = this.getModel();
        if (typeof model.willInsert === 'function') {
          await model.willInsert(this);
        }
        const query: MaevaQueryOne = {
          model,
          set: this,
        };
        const {results} = await Connection.insertOne(query);
        const [inserted] = results.set;
        if (typeof model.didInsert === 'function') {
          await model.didInsert(this);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  remove() {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof this.constructor.willRemove === 'function') {
          await this.constructor.willRemove(this);
        }
        await Connection.removeOne({
          model: this.constructor,
          get: {['maeva.id']: this.get('maeva.id')},
        });
        resolve();
        if (typeof this.constructor.didRemove === 'function') {
          this.constructor.didRemove(this);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  save(): Promise<MaevaConnectorResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const type: 'update' | 'insert' =
          this.get('maeva.id') ? 'update' : 'insert';

        const model: Function = this.constructor;

        const payload: MaevaQuery = {model: this.constructor.toJSON()};

        if (type === 'update') {
          payload.get = {['maeva.id']: this.get('maeva.id')};
          payload.set = this.changes;
        } else {
          payload.set = this.toJSON();
        }

        let results;

        if (type === 'update') {
          if (typeof model.willUpdate === 'function') {
            await model.willUpdate(this);
          }
          results = await Connection.updateOne(payload);
        } else {
          if (typeof model.willInsert === 'function') {
            await model.willInsert(this);
          }
          results = await Connection.insertOne(payload);
        }

        resolve(results);

        if (type === 'update' && typeof model.didUpdate === 'function') {
          await model.didUpdate(this);
        } else if (typeof model.didInsert === 'function') {
          await model.didInsert(this);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  set(setter: {[field: string]: any} = {}): Model {
    let field: string;
    let fieldValue: any;
    let structure: Field;
    try {
      for (field in setter) {
        fieldValue = clone(setter[field]);
        structure = this.schema[field];

        if (structure) {
          if (
            (typeof fieldValue === 'undefined' || fieldValue === null) &&
            structure.hasDefault()
          ) {
            fieldValue = structure.getDefaultValue();
          }

          fieldValue = structure.formatValue(fieldValue);

          this.fields[field] = fieldValue;
          this.changes[field] = fieldValue;
        }
      }
    } catch (error) {
      throw new MaevaError.SET_FIELD_ERROR(
        field || '',
        fieldValue,
        structure,
        error
      );
    }
    return this;
  }

  toJSON() {
    const json = {};
    for (const field in this.fields) {
      json[field] = this.get(field);
    }
    return json;
  }

}
