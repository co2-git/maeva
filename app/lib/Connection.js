// @flow
import 'babel-polyfill';
import {EventEmitter} from 'events';
import type {STATUS} from '../../flow';

class Connection extends EventEmitter {

  // ---------------------------------------------------------------------------

  static connections: Connection[] = [];
  static events: EventEmitter = new EventEmitter();
  static index: number = 0;

  // ---------------------------------------------------------------------------

  static test(url: number|string): (conn: Connection) => Promise<void> {
    return (conn: Connection): Promise<*> => new Promise((resolve, reject) => {
      try {
        conn.operations = {
          find: (doc) => new Promise((resolve) => resolve(doc)),
          insert: (doc) => new Promise((resolve) => resolve(
            Array.isArray(doc.documents) ?
              doc.documents.map(doc => doc.toJSON()) : doc.documents.toJSON()
          )),
          update: (doc) => new Promise((resolve) => resolve(doc)),
          delete: (doc) => new Promise((resolve) => resolve(doc)),
        };
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

  static connect(driver: Function, name: ?string): Promise<Connection> {
    return new Promise(async (resolve, reject) => {
      try {
        const connection: Connection = new Connection();
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
        connection.status = 'failed';
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

  index: number = 0;
  operations: {[action: string]: Promise<*>} = {};
  status: STATUS = 'idle';
  name: ?string;

  // ---------------------------------------------------------------------------

  // Instance methods

  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------

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
