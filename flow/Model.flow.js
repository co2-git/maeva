// @flow

declare type MaevaModelOptions = {|
  +after?: MaevaHook,
  +before?: MaevaHook,
  +default?: {|
    +[fieldName: string]: any,
  |},
  +required?: string[],
|};

declare type MaevaModel = {|
  +name: string,
  +fields: MaevaSchema,
  +options: MaevaModelOptions,
|};

declare type MaevaModelMaker = (
  name: string,
  fields: MaevaSchema,
  options: MaevaModelOptions,
) => MaevaModel;
