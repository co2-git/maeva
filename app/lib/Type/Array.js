// @flow
import _ from 'lodash';
import associate from './associate';

export default class _Array {
  static convert(array: any, type: Function): any {
    if (!_.isArray(array)) {
      return array;
    }
    try {
      const _type = associate(type);
      return array.map((item: any): any => _type.convert(item));
    } catch (error) {
      return array;
    }
  }

  static validate(array: any, type: Function|Function[]): boolean {
    try {
      if (_.isArray(type)) {
        return array.every(
          (nestedArray: any[]): boolean =>
            _Array.validate(nestedArray, type[0])
        );
      }
      const _type = associate(type);
      return array.every((item: any): any => _type.validate(item));
    } catch (error) {
      return false;
    }
  }
}
