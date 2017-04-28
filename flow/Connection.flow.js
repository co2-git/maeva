// @flow

declare type MaevaConnectorResponse = {
  query: MaevaQuery,
  results: {
    get: Object[],
    set: Object[],
    unset: Object[],
  },
};

declare type MaevaConnectorAction = (
  conn: MaevaConnection,
  query: MaevaQuery
) => Promise<MaevaConnectorResponse>;
