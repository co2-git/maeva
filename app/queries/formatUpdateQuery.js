import formatUpdateQueryObject from './formatUpdateQueryObject';
import formatUpdateQueryFunction from './formatUpdateQueryFunction';

const formatUpdateQuery = (query = {}, model, options = {}) => {
  const type = typeof query;
  switch (type) {
  case 'object':
    return formatUpdateQueryObject(query, model, options);
  case 'function':
    return formatUpdateQueryFunction(query, model, options);
  default:
    throw new Error(
      `Update query must be either an object or a function (got ${type})`
    );
  }
};

export default formatUpdateQuery;
