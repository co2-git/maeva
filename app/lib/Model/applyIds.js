// @flow
import MaevaError from '../Error';

export default function applyIds() {
  for (const field in this) {
    try {
      if (this.$schema[field].type.isMaevaModel) {
        const {id} = this.$conn;
        if (id) {
          this[field] = this[field][id.name];
        }
      }
    } catch (error) {
      throw MaevaError.rethrow(error, MaevaError.FIELD_IS_UNDEFINED, {
        field, schema: this.$schema, document: this,
      });
    }
  }
}
