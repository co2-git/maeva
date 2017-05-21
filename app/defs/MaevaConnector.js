// @flow
import EventEmitter from 'events';

export default class MaevaConnector {

  actions: {
    connect: () => void,
    disconnect: () => void,
    insertOne: (MaevaQuery) => Promise<MaevaConnectorResponse>,
  };
  emitter: EventEmitter;

  constructor(args: Object) {
    Object.assign(this, args);

    if (!this.emitter) {
      this.emitter = new EventEmitter();
    }
  }

}
