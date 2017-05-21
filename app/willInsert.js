// @flow
import get from 'lodash/get';

const willInsert = (doc: Object, model: Object) =>
  new Promise(async (resolve, reject) => {
    try {
      const hook = get(model, 'options.will.insert');
      if (typeof hook === 'function') {
        resolve(await hook(doc));
      } else {
        resolve(doc);
      }
    } catch (error) {
      reject(error);
    } finally {
      resolve();
    }
  });

export default willInsert;
