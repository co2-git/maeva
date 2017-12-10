export const _in = (...values) => () => ({in: values});
export const above = value => () => ({above: value});
export const add = (value = 1) => () => ({add: value});
export const after = value => () => ({after: value});
export const and = (...values) => () => ({and: values});
export const before = value => () => ({before: value});
export const below = value => () => ({below: value});
export const divide = (value = 1) => () => ({divide: value});
export const increment = (value = 1) => () => ({increment: value});
export const multiply = (value = 1) => () => ({multiply: value});
export const not = value => () => ({not: value});
export const or = (...values) => () => ({or: values});
export const out = (...values) => () => ({out: values});
export const subtract = (value = 1) => () => ({subtract: value});
