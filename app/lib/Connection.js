// @flow

import mongodb, {Db} from 'mongodb';
import {EventEmitter} from 'events';
import sequencer from 'promise-sequencer';

class Connection extends EventEmitter {

  // ---------------------------------------------------------------------------

  static connections: Connection[] = [];
  static url: string = 'mongodb://@localhost';
  static events: EventEmitter = new EventEmitter();
  static index: number = 0;

  // ---------------------------------------------------------------------------

  static connect(url: ?string): Connection {
    const mongodb_url: string = url || this.url;
    const connection: Connection = new Connection();
    connection.index = this.index;
    this.index++;
    this.connections.push(connection);

    sequencer
      .promisify(
        mongodb.MongoClient.connect,
        [mongodb_url],
        mongodb.MongoClient
      )
      .then(db => {
        connection.connected = true;
        connection.db = db;
        connection.emit('connected', connection);
        this.events.emit('connected', connection);
      })
      .catch(error => {
        connection.emit('error', error);
      });

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
