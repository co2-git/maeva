import get from 'lodash/get';

const afterHook = (action, doc, model) =>
new Promise(async (resolve, reject) => {
  try {
    const hook = get(model, `options.after.${action}`);
    if (Array.isArray(hook)) {
      for (const _hook of hook) {
        await _hook(doc, model);
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

export default afterHook;
