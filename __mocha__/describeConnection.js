'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _chai = require('chai');

var _describeConnector = require('./describeConnector');

var _describeConnector2 = _interopRequireDefault(_describeConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var describeConnection = function describeConnection(connection) {
  return describe('Connection', function () {
    console.log(connection);

    (0, _describeConnector2.default)(connection.connector);

    describe('Emitter', function () {
      it('should have an emitter', function () {
        (0, _chai.expect)(connection.emitter).to.be.an.instanceof(_events2.default);
      });
    });

    describe('Status', function () {
      it('should have a status', function () {
        (0, _chai.expect)(connection.status).to.be.a('string');
      });
    });
  });
}; /* global describe it */
exports.default = describeConnection;