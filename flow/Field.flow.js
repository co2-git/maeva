// @flow

declare type MaevaField = Field;

declare type MaevaSchema = {
  [field: string]: Field,
};

declare type MaevaSchemaJSON = {
  [field: string]: {
    type: string,
  },
};
