import get from 'lodash/get';

const didInsert = (doc: any, model: MaevaModel) =>
  new Promise(async (resolve, reject) => {
    try {
      const hook: ?MaevaHook = get(model, 'options.after.insert');
      if (Array.isArray(hook)) {
        for (const _hook of hook) {
          doc = await _hook(doc, model);
        }
        resolve();
      } else if (typeof hook === 'function') {
        await hook(doc, model);
        resolve();
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });

export default didInsert;
