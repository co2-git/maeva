// @flow
import 'babel-polyfill';
import EventEmitter from 'events';

class Connection extends EventEmitter {

  // ---------------------------------------------------------------------------

  static connections: Connection[] = [];
  static events: EventEmitter = new EventEmitter();
  static index: number = 0;

  // ---------------------------------------------------------------------------

  static on(event: string, cb: Function): Function {
    this.events.on(event, cb);
    return this;
  }

  static once(event: string, cb: Function): Function {
    this.events.once(event, cb);
    return this;
  }

  static off(event: string, cb: Function): Function {
    this.events.removeListener(event, cb);
    return this;
  }

  static emit(...messages: any[]): Function {
    this.events.emit(...messages);
    return this;
  }

  static count = ({model, get, conn}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const _conn = conn || await this.findConnection();
        resolve(await _conn.count({model, get}));
      } catch (error) {
        reject(error);
      }
    });
  };

  static findOne({model, get, conn, projection}) {
    return new Promise(async (resolve, reject) => {
      try {
        const _conn: Connection = conn || await this.findConnection();
        resolve(await _conn.operations.findOne({model, get, projection}));
      } catch (error) {
        reject(error);
      }
    });
  }

  static insertOne({model, set, conn}) {
    return new Promise(async (resolve, reject) => {
      try {
        const _conn: Connection = conn || await this.findConnection();
        resolve(await _conn.operations.insertOne({model, set}));
      } catch (error) {
        reject(error);
      }
    });
  }

  static connect(driver: Function, name: ?string): Promise<Connection> {
    return new Promise(async (resolve, reject) => {
      let connection: ?Connection;
      try {
        connection = new Connection();
        if (name) {
          connection.name = name;
        }
        connection.index = this.index;
        this.index++;
        this.connections.push(connection);
        connection.status = 'connecting';
        await driver(connection);
        connection.status = 'connected';
        connection.emit('connected', connection);
        this.events.emit('connected', connection);
        resolve(connection);
      } catch (error) {
        if (connection instanceof this) {
          connection.status = 'failed';
          connection.emit('error', error);
        }
        this.events.emit('error', error);
        reject(error);
      }
    });
  }

  static findConnection(): Promise<Connection> {
    return new Promise(async (resolve, reject) => {
      try {
        let $conn: Connection;
        const availableConnections = Connection.connections.filter(
          conn => conn.status === 'connected'
        );
        if (availableConnections.length) {
          $conn = availableConnections[0];
        } else {
          $conn = await new Promise((resolveConnected) => {
            Connection.events.on('connected', resolveConnected);
          });
        }
        await $conn.ready();
        resolve($conn);
      } catch (error) {
        reject(error);
      }
    });
  }

  // ---------------------------------------------------------------------------

  static disconnect(): Promise<*> {
    return Promise.all(this.connections.map(
      connection => connection.disconnect()
    ));
  }

  // Default properties
  index: number = 0;
  status: $Connection$status = 'idle';
  name: ?string;
  _id: ?{
    name: string,
    type: Function,
  };
  schema: ?Object;

  // Properties merged with vendor client
  operations: $Connection$operations;
  disconnectDriver: () => Promise<void>;

  // Call this function to make sure connection is ready
  // It returns a promise that resolves when connection is ready
  ready(): Promise<void> {
    return new Promise((resolve, reject) => {
      switch (this.status) {
      case 'idle':
      case 'connecting':
        this.on('connected', resolve);
        break;
      case 'connected':
        resolve();
        break;
      case 'disconnecting':
      case 'disconnected':
      case 'failed':
        reject(new Error(`Can not connect, connection is ${this.status}`));
        break;
      }
    });
  }

  disconnect(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        this.status = 'disconnecting';
        await this.disconnectDriver();
        this.status = 'disconnected';
        this.emit('disconnected');
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  // ---------------------------------------------------------------------------

}

export default Connection;
