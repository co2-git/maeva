// @flow
import EventEmitter from 'events';

export default class DataConnection {

  connector: DataConnector;
  emitter: EventEmitter;
  status: string = 'idle';

  constructor(args: Object) {
    Object.assign(this, args);

    if (!this.emitter) {
      this.emitter = new EventEmitter();
    }
  }

}
