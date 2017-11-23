// @flow

declare type MaevaConnectionStatus =
  | 'connected'
  | 'connecting'
  | 'disconnected'
  | 'disconnecting'
  | 'failed'
  | 'idle'
  | 'reconnected'
  | 'reconnecting'
  ;

declare type MaevaConnection = {|
  +awaitConnection: () => Promise<void>,
  +connector: MaevaConnector,
  +emitter: EventEmitter,
  +status: MaevaConnectionStatus,
|};
