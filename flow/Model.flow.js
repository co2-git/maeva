// @flow

declare type MaevaModelOptions = {|
  +after?: MaevaHook,
  +before?: MaevaHook,
  +default?: {|
    +[fieldName: string]: any,
  |},
  +required?: string[],
  +validate: {|
    +[fieldName: string]: RegExp | (value: any) => boolean,
  |},
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
