// @flow
import get from 'lodash/get';

const didInsert = (doc: Object, model: Object) =>
  new Promise(async (resolve, reject) => {
    try {
      const hook = get(model, 'options.did.insert');
      if (typeof hook === 'function') {
        await hook(doc);
      }
      resolve();
    } catch (error) {
      reject(error);
    } finally {
      resolve();
    }
  });

export default didInsert;
