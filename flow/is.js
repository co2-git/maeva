// @flow


declare type Type = Function;

declare type FieldType = {
  type: Type,
};

declare function is<Type: Type>(
    Type: Type
  ): FieldType;
