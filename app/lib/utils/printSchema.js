// @flow
export
type ARGS = Array<[Object]>;
export
type RETURN = Object;

export default function printSchema(_schema: Object): RETURN {
  const schema = {};
  for (const field in _schema) {
    if (_schema[field].type.name === '_EmbeddedMaevaDocument') {
      schema[field] = {
        ..._schema[field],
        type: printSchema(_schema[field].type.schema),
      };
    } else {
      schema[field] = {
        ..._schema[field],
        type: _schema[field].type.name,
      };
    }
  }
  return schema;
}
