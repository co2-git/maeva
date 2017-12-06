export const _in = (...values) => () => ({in: values});
export const above = value => () => ({above: value});
export const not = value => () => ({not: value});
export const out = (...values) => () => ({out: values});
