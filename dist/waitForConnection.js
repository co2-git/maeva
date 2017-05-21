'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var waitForConnection = function waitForConnection(connection) {
  return new Promise(function (resolve, reject) {
    switch (connection.status) {
      case 'connecting':
        connection.emitter.on('connected', resolve);
        break;
      case 'connected':
        resolve();
        break;
      case 'disconnecting':
      case 'disconnected':
      case 'failed':
        reject(new Error('Can not connect, connection is ' + connection.status));
        break;
    }
  });
};

exports.default = waitForConnection;