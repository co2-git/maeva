export const _in = (...values) => () => ({in: values});
export const above = value => () => ({above: value});
export const and = (...values) => () => ({and: values});
export const before = value => () => ({before: value});
export const below = value => () => ({below: value});
export const not = value => () => ({not: value});
export const or = (...values) => () => ({or: values});
export const out = (...values) => () => ({out: values});
