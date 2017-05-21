'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _connections = require('./connections');

var _connections2 = _interopRequireDefault(_connections);

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connect = function connect(connector) {
  var connection = {
    connector: connector(),
    emitter: new _events2.default(),
    status: 'connecting'
  };

  _connections2.default.push(connection);

  connection.connector.actions.connect();

  connection.connector.emitter.on('connected', function () {
    connection.status = 'connected';
    connection.emitter.emit('connected', connection);
    _emitter2.default.emit('connected', connection);
  });

  connection.connector.emitter.on('disconnected', function () {
    connection.status = 'disconnected';
    connection.emitter.emit('disconnected', connection);
    _emitter2.default.emit('disconnected', connection);
  });

  connection.connector.emitter.on('error', function (error) {
    connection.status = 'failed';
    connection.emitter.emit('error', error);
    _emitter2.default.emit('error', error);
  });

  return connection;
};
exports.default = connect;