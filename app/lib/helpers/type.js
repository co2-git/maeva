// @flow
import Field from '../Field';
import MaevaTypeAny from '../types/Any';
import MaevaTypeArray from '../types/Array';
import MaevaTypeMixed from '../types/Mixed';
import MaevaTypeObject from '../types/Object';
import MaevaTypeTuple from '../types/Tuple';

const type = (t_: Function): Field => new Field(t_);

type.object = (shape: {[attr: string]: any}): Field => new Field(
  new MaevaTypeObject(shape),
);

type.array = (t_: Function | Field): Field => new Field(
  new MaevaTypeArray(t_),
);

type.tuple = (...types: Array<Function | Field>): Field => new Field(
  new MaevaTypeTuple(...types)
);

type.mixed = (...types: Array<Function | Field>): Field => new Field(
  new MaevaTypeMixed(...types)
);

type.any = (): Field => new Field(
  new MaevaTypeAny()
);

export default type;
