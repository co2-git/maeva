// @flow
import MaevaError from '../Error';

export default function applyIds() {
  for (const field in this) {
    if (!/^\$/.test(field)) {
      try {
        if (this.$schema[field].type.isMaevaModel) {
          const {id} = this.$conn;
          if (id) {
            this[field] = this[field][id.name];
          }
        }
      } catch (error) {
        throw MaevaError.rethrow(error, MaevaError.COULD_NOT_APPLY_ID, {
          field, schema: this.$schema, document: this,
        });
      }
    }
  }
}
