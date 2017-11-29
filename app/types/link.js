// @flow
import {every, isArray, map} from 'lodash';
import DataType from '../defs/DataType';
import getType from './getType';

const linkType = (type: Function | DataType) => ({
  convert: (value: any, options = {}): any => {
    if (!options.connector) {
      return null;
    }
    return value[options.connector.id.name];
  },
  validate: (value: any, options = {}): boolean => {
    const idType = getType(options.connector.id.type);
    return idType.validate(value);
  },
});

export default linkType;
