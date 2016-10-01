export default function getPopulatableFields() {
  const populatable = [];
  const schema = this.getSchema();
  for (const field in schema) {
    if (schema[field].type.isMaevaModel) {
      populatable.push({...schema[field], field});
    }
  }
  return populatable;
}
