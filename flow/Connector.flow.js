// @flow

declare type MaevaConnector = {|
  +actions: {|
    +connect: (url: string, options: Object) => void,
    +disconnect: () => void,
    +insertOne: (document: Object, model: MaevaModel) => Promise<Object>,
  |},
  +emitter: EventEmitter,
|};
