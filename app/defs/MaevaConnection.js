// @flow
import EventEmitter from 'events';
import MaevaConnector from './MaevaConnector';

export default class MaevaConnection {

  connector: MaevaConnector;
  emitter: EventEmitter;
  status: MaevaConnectionStatus = 'idle';

  constructor(args: Object) {
    Object.assign(this, args);

    if (!this.emitter) {
      this.emitter = new EventEmitter();
    }
  }

}
