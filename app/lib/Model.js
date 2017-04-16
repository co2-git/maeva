// @flow
import StaticModel from './Model/StaticModel';
import Field from './Field';
import Connection from './Connection';

export default class Model extends StaticModel {

  changes: {[field: string]: Field} = {};
  fields: {[field: string]: Field} = {};

  constructor(document: Object = {}) {
    super();
    const model = this.constructor;
    const {maevaSchema, schema} = model;
    const schemas = {...schema, ...maevaSchema};
    for (const field in schemas) {
      this.set(field, document[field]);
    }
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

  set(field: string | {[field: string]: any}, value: any): Model {
    if (typeof field === 'object') {
      for (const attr in field) {
        this.set(attr, field[attr]);
      }
      return this;
    }
    const {schema} = this.constructor;
    if ((field in schema)) {
      const formattedValue = schema[field].formatValue(value);
      this.fields[field] = formattedValue;
      this.changes[field] = formattedValue;
    }
    return this;
  }

  toJSON() {
    const json = {};
    const model = this.constructor;
    const {maevaSchema, schema} = model;
    const schemas = {...schema, ...maevaSchema};
    for (const field in schemas) {
      json[field] = this.get(field);
    }
    return json;
  }

}
