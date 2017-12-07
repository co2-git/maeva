import formatFindQueryObject from './formatFindQueryObject';
import formatFindQueryFunction from './formatFindQueryFunction';

const formatFindQuery = (query = {}, model, options = {}) => {
  const type = typeof query;
  switch (type) {
  case 'object':
    return formatFindQueryObject(query, model, options);
  case 'function':
    return formatFindQueryFunction(query, model, options);
  default:
    throw new Error(
      `Find query must be either an object or a function (got ${type})`
    );
  }
};

export default formatFindQuery;
