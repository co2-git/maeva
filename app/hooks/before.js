import get from 'lodash/get';

const beforeHook = (action, doc, model) =>
new Promise(async (resolve, reject) => {
  try {
    const hook = get(model, `options.before.${action}`);
    if (hook) console.log('before', model, doc)
    if (Array.isArray(hook)) {
      for (const _hook of hook) {
        doc = await _hook(doc, model);
      }
      resolve(doc);
    } else if (typeof hook === 'function') {
      resolve(await hook(doc, model));
    } else {
      resolve(doc);
    }
  } catch (error) {
    reject(error);
  }
});

export default beforeHook;
