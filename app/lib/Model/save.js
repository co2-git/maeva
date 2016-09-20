// @flow
export type ARGS = Array<?Object>;

export default function save(options: ?Object = {}): Promise<> {
  return new Promise(async (resolve, reject) => {
    try {
      await this.connect();
      this.applyDefault();
      this.ensureRequired();
      this.runValidators();
      if (options.dontSend) {
        resolve();
        return;
      }
      if (this.$fromDB) {
        let get = {};
        // is database using unique id or primary keys?
        if (this.$conn.id) {
          const id = this.$conn.id.name;
          get = {[id]: this[id]};
        } else {
          // otherwise use untouched object
          get = this.$old;
        }
        await this.$conn.operations.update({
          model: this,
          collection: this.constructor.getCollectionName(),
          get,
          set: this.$changed,
        });
      } else {
        await this.$conn.operations.insert({
          model: this,
          collection: this.constructor.getCollectionName(),
          documents: this.toJSON(),
        });
      }
      resolve();
      this.$changed = {};
    } catch (error) {
      reject(error);
    }
  });
}
