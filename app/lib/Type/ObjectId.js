// @flow
import {ObjectId} from 'mongodb';

export default class MungoObjectId {
  static validate(value: any): boolean {
    return value instanceof ObjectId;
  }
  static convert(value: any): any {
    if (this.validate(value)) {
      return value;
    }
    try {
      return new ObjectId(value);
    } catch (error) {
      return value;
    }
  }
}
