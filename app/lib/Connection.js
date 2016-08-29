// @flow
import 'babel-polyfill';
import {EventEmitter} from 'events';

class Connection extends EventEmitter {

  // ---------------------------------------------------------------------------

  static connections: Connection[] = [];
  static events: EventEmitter = new EventEmitter();
  static index: number = 0;

  // ---------------------------------------------------------------------------

  static test(url: number|string): Function {
    return (conn: Connection): Promise<*> => new Promise((resolve) => {
      conn.connected = true;
      conn.db = {};
      conn.emit('connected', conn);
      this.events.emit('connected', conn);
      resolve();
    });
  }

  // ---------------------------------------------------------------------------

  static async connect(driver: Function): Connection {
    const connection: Connection = new Connection();
    connection.index = this.index;
    this.index++;
    this.connections.push(connection);

    try {
      await driver(connection);
    } catch (error) {
      connection.emit('error', error);
      this.events.emit('error', error);
    }

    return connection;
  }

  // ---------------------------------------------------------------------------

  static connectify(url: ?string): Promise<Connection> {
    return new Promise((resolve, reject) => {
      this.connect(url)
        .on('connected', resolve)
        .on('error', reject);
    });
  }

  // ---------------------------------------------------------------------------

  static disconnect(): Promise<*> {
    return Promise.all(this.connections.map(
      connection => connection.disconnect()
    ));
  }

  // ---------------------------------------------------------------------------

  // Instance properties

  // ---------------------------------------------------------------------------

  connected: boolean = false;
  disconnected: boolean = false;
  db: Db = null;
  index: number = 0;

  // ---------------------------------------------------------------------------

  // Instance methods

  // ---------------------------------------------------------------------------

  disconnect(): Promise<void> {
    return sequencer(
      () => this.db.close(),
      () => new Promise((resolve) => {
        this.connected = false;
        this.disconnected = true;
        this.emit('disconnected');
        resolve();
      })
    );
  }

  // ---------------------------------------------------------------------------

}

export default Connection;
