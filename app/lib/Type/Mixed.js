// @flow
import associate from './associate';
import {set} from './set';

export default function Mixed(...args: any[]) {
  const mixed = args.map(type => associate(type));
  const fn = () => mixed;
  fn.mixed = mixed;
  fn.validate = (value: any): boolean => {
    return mixed.some(type => type.validate(value));
  };
  fn.convert = (value: any): any => {
    for (const type of mixed) {
      if (type.validate(value)) {
        return value;
      }
    }
    let converted;
    for (const type of mixed) {
      converted = type.convert(value);
      if (type.validate(converted)) {
        return converted;
      }
    }
    return value;
  };
  fn.set = (value: any): any => set(value, fn);
  return fn;
}
