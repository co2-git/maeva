import formatFindQuery from './formatFindQuery';

const formatFindQueryFunction = (fn, model, options = {}) => {
  const resolved = fn();
  if (
    !resolved ||
    typeof resolved !== 'object' ||
    !(resolved.and || resolved.or)
  ) {
    throw new Error('Condition must be and/or');
  }
  const conditions = resolved.and || resolved.or;
  if (!conditions.length) {
    return [];
  }
  if (conditions.length === 1) {
    const formatted = formatFindQuery(conditions[0], model, options);
    if (resolved.and) {
      return formatted;
    }
    if (resolved.or) {
      return [{or: [formatted]}];
    }
  }
  const formatted = [];
  for (const condition of conditions) {
    formatted.push(formatFindQuery(condition, model, options));
  }
  if (resolved.and) {
    return formatted;
  }
  return [{or: formatted}];
};

export default formatFindQueryFunction;
