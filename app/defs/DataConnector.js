// @flow
import EventEmitter from 'events';

export default class DataConnector {

  actions: {
    connect: () => void,
    disconnect: () => void,
    insertOne: (
      doc: DataDocument,
      model: DataModel,
    ) => Promise<DataConnectorResponse>,
  };
  emitter: EventEmitter;

  constructor(args: Object) {
    Object.assign(this, args);

    if (!this.emitter) {
      this.emitter = new EventEmitter();
    }
  }

}
