// @flow
export type ARGS = Array<[?Object, Object, Object]>;
export type RETURN = Promise<number>;

export default function remove(
  query: ?Object,
  modifier: Object,
  options: Object = {}
): RETURN {
  return new Promise(async (resolve, reject) => {
    try {
      const {model, statement: get} = await this.makeStatement(query);
      const removed = await model.$conn.operations.remove({
        model: this,
        collection: this.getCollectionName(),
        get,
        options,
      });
      resolve(removed);
    } catch (error) {
      console.log(error.stack);
      reject(error);
    }
  });
}
