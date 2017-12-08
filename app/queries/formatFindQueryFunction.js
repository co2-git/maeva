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
  if (resolved.and) {
    if (conditions.length === 1) {
      const formatted = formatFindQuery(conditions[0], model, options);
      return formatted;
    }
    const formatted = [];
    for (const condition of conditions) {
      formatted.push(...formatFindQuery(condition, model, options));
    }
    return formatted;
  }
  if (conditions.length === 1) {
    const formatted = formatFindQuery(conditions[0], model, options);
    return [{or: [formatted]}];
  }
  const formatted = [];
  for (const condition of conditions) {
    formatted.push(formatFindQuery(condition, model, options));
  }
  return [{or: formatted}];
};

export default formatFindQueryFunction;
