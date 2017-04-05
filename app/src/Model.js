// @flow
import {id, type} from '..';
import Field from './Field';

export default class Model {

  static version = 0;

  static maevaSchema = {
    maeva: type.object({
      id: type(String),
      version: type(Number).default(this.version),
      revision: type(Number).default(0),
      inserted: type(Date).default(Date.now),
      updated: type(Date).default(Date.now),
    }),
  };

  static schema = {};

  static count(query) {
    return maeva.count({
      model: this,
      get: query,
    });
  }

  static insertOne(document) {
    new Promise(async (resolve, reject) => {
      try {
        const candidate = new this(document);
        resolve(await candidate.save());
      } catch (error) {
        reject(error);
      }
    });
  }

  static insertMany(...documents) {
    new Promise(async (resolve, reject) => {
      try {
        const candidates = documents.map(doc => new this(doc));
        if (typeof this.constructor.onWillInsert === 'function') {
          let hooks = this.constructor.onWillInsert();
          if (!isArray(hooks)) {
            hooks = [hooks];
          }
          for (const model of candidates) {
            for (const hook of hooks) {
              await hook(model);
            }
          }
        }
        await maeva.insertMany({
          model: this,
          set: candidates.map(model => model.toJSON()),
        });
        resolve(candidates);
      } catch (error) {
        reject(error);
      }
    });
  }

  changes: {[field: string]: Field} = {};
  fields: {[field: string]: Field} = {};

  constructor(document: Object) {
    const model = this.constructor;
    const {maevaSchema, schema} = model;
    const schemas = {...schema, ...maevaSchema};
    for (const field in schemas) {
      this.set(field, document[field]);
    }
  }

  get(field: string) {
    return this.fields[field];
  }

  set(field: string | {[field: string]: any}, value: any): Model {
    const {schema} = this.constructor;
    if (schema[field]) {
      const formattedValue = schema[field].formatValue(value);
      this.fields[field] = formattedValue;
      this.changes[field] = formattedValue;
    }
    return this;
  }

  save(): Promise<void> {
    if (this.get('maeva.id')) {
      return new Promise(async (resolve, reject) => {
        try {
          if (typeof this.constructor.onWillUpdate === 'function') {
            let hooks = this.constructor.onWillUpdate();
            if (!isArray(hooks)) {
              hooks = [hooks];
            }
            for (const hook of hooks) {
              await hook(this);
            }
          }
          await maeva.updateOne({
            model: this.constructor,
            get: {['maeva.id']: this.get('maeva.id')},
            set: this.changes,
          });
          resolve();
          process.nextTick(async () => {
            if (typeof this.constructor.onDidUpdate === 'function') {
              let hooks = this.constructor.onDidUpdate();
              if (!isArray(hooks)) {
                hooks = [hooks];
              }
              for (const hook of hooks) {
                await hook(this);
              }
            }
          } catch (error) {
            reject(error);
          }
        });
      });
    } else {
      return new Promise(async (resolve, reject) => {
        try {
          this.set('maeva.id', id());
          if (typeof this.constructor.onWillInsert === 'function') {
            let hooks = this.constructor.onWillInsert();
            if (!isArray(hooks)) {
              hooks = [hooks];
            }
            for (const hook of hooks) {
              await hook(this);
            }
          }
          await maeva.insertOne({
            model: this.constructor,
            set: this.toJSON(),
          });
          resolve();
          process.nextTick(() => {
            if (typeof this.constructor.onDidInsert === 'function') {
              let hooks = this.constructor.onDidInsert();
              if (!isArray(hooks)) {
                hooks = [hooks];
              }
              for (const hook of hooks) {
                await hook(this);
              }
            }
          })
        } catch (error) {
          reject(error);
        }
      });
    }
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

  remove() {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof this.constructor.onWillRemove === 'function') {
          let hooks = this.constructor.onWillRemove();
          if (!isArray(hooks)) {
            hooks = [hooks];
          }
          for (const hook of hooks) {
            await hook(this);
          }
        }
        await maeva.removeOne({
          model: this.constructor,
          get: {['maeva.id']: this.get('maeva.id')},
        });
        resolve();
        process.nextTick(() => {
          if (typeof this.constructor.onDidRemove === 'function') {
            let hooks = this.constructor.onDidRemove();
            if (!isArray(hooks)) {
              hooks = [hooks];
            }
            for (const hook of hooks) {
              await hook(this);
            }
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }

}
