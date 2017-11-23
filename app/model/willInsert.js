// @flow
import get from 'lodash/get';

const willInsert = (doc: any, model: MaevaModel) =>
  new Promise(async (resolve, reject) => {
    try {
      const hook: ?MaevaHook = get(model, 'options.before.insert');
      if (Array.isArray(hook)) {
        resolve(await Promise.all(hook.map(h => h(doc, model))));
      } else if (typeof hook === 'function') {
        resolve(await hook(doc, model));
      } else {
        resolve(doc);
      }
    } catch (error) {
      reject(error);
    }
  });

export default willInsert;
