// @flow
import 'babel-polyfill';
import {EventEmitter} from 'events';

class Connection extends EventEmitter {

  // ---------------------------------------------------------------------------

  static connections: Connection[] = [];
  static events: EventEmitter = new EventEmitter();
  static index: number = 0;

  // ---------------------------------------------------------------------------

  static test(url: number|string): (conn: Connection) => Promise<void> {
    return (conn: Connection): Promise<*> => new Promise((resolve, reject) => {
      try {
        conn.disconnectDriver = () => new Promise((resolve) => {
          resolve();
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  // ---------------------------------------------------------------------------

  static connect(driver: Function): Promise<Connection> {
    return new Promise(async (resolve, reject) => {
      try {
        const connection: Connection = new Connection();
        connection.index = this.index;
        this.index++;
        this.connections.push(connection);
        await driver(connection);
        connection.connected = true;
        connection.emit('connected', connection);
        this.events.emit('connected', connection);
        resolve(connection);
      } catch (error) {
        connection.emit('error', error);
        this.events.emit('error', error);
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

  // ---------------------------------------------------------------------------

  // Instance properties

  // ---------------------------------------------------------------------------

  connected: boolean = false;
  disconnected: boolean = false;
  index: number = 0;

  // ---------------------------------------------------------------------------

  // Instance methods

  // ---------------------------------------------------------------------------

  disconnect(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.disconnectDriver();
        this.connected = false;
        this.disconnected = true;
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
