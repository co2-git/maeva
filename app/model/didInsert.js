// @flow
import get from 'lodash/get';

const didInsert = (doc: any, model: MaevaModel) =>
  new Promise(async (resolve, reject) => {
    try {
      const hook: ?MaevaHook = get(model, 'options.after.insert');
      if (Array.isArray(hook)) {
        await Promise.all(hook.map(h => h(doc, model)))
      } else if (typeof hook === 'function') {
        await hook(doc, model);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });

export default didInsert;
