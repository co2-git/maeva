// @flow
export default function applyIds() {
  for (const field in this) {
    if (this.$schema[field].type.isMaevaModel) {
      const {id} = this.$conn;
      if (id) {
        this[field] = this[field][id.name];
      }
    }
  }
}
