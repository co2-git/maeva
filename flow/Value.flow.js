// @flow

declare type MaevaPrimitiveValue =
  | boolean
  | Date
  | null
  | number
  | string
  ;

declare type MaevaScalarValue = MaevaPrimitiveValue[];

declare type MaevaShapeValue = {
  [fieldName: string]: | MaevaPrimitiveValue
    | MaevaScalarValue
    | MaevaShapeValue
    ,
};

declare type MaevaValue =
  | MaevaPrimitiveValue
  | MaevaScalarValue
  | MaevaShapeValue
  ;
