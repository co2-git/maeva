import every from 'lodash/every';
import isArray from 'lodash/isArray';
import map from 'lodash/map';
import getType from './getType';

const arrayType = (type) => ({
  convert: (array) => (
    (isArray(array) && map(array, getType(type).convert)) ||
    array
  ),
  validate: (array) => {
    if (!isArray(array)) {
      throw new Error('Expecting an array');
    }
    every(array, getType(type).validate);
  }
});

export default arrayType;
