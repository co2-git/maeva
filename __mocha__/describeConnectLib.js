'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connect = require('../__dist__/connect');

var _connect2 = _interopRequireDefault(_connect);

var _describeConnection = require('./describeConnection');

var _describeConnection2 = _interopRequireDefault(_describeConnection);

var _MaevaConnector = require('../__dist__/defs/MaevaConnector');

var _MaevaConnector2 = _interopRequireDefault(_MaevaConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fn = function fn() {
  return 1;
}; /* global describe */


var fakeConnection = new _MaevaConnector2.default({
  actions: {
    connect: fn,
    count: fn,
    disconnect: fn,
    findMany: fn,
    findOne: fn,
    insertMany: fn,
    insertOne: fn,
    removeMany: fn,
    removeOne: fn,
    updateMany: fn,
    updateOne: fn
  },
  status: 'loading'
});

var describeConnect = function describeConnect() {
  return describe('Connect', function () {
    describe('Connection', function () {
      describe('should return a connection', function () {
        (0, _describeConnection2.default)((0, _connect2.default)(fakeConnection));
      });
    });
  });
};

exports.default = describeConnect;