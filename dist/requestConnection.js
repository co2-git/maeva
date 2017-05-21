'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _first = require('lodash/first');

var _first2 = _interopRequireDefault(_first);

var _shuffle = require('lodash/shuffle');

var _shuffle2 = _interopRequireDefault(_shuffle);

var _connections = require('./connections');

var _connections2 = _interopRequireDefault(_connections);

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _waitForConnection = require('./waitForConnection');

var _waitForConnection2 = _interopRequireDefault(_waitForConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var requestConnection = function requestConnection() {
  return new Promise(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
      var connection, availableConnections;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              connection = void 0;
              availableConnections = (0, _filter2.default)(_connections2.default, function (conn) {
                return conn.status === 'connected';
              });

              if (!availableConnections.length) {
                _context.next = 7;
                break;
              }

              connection = (0, _first2.default)((0, _shuffle2.default)(availableConnections));
              _context.next = 10;
              break;

            case 7:
              _context.next = 9;
              return new Promise(function (resolveConnected) {
                _emitter2.default.on('connected', resolveConnected);
              });

            case 9:
              connection = _context.sent;

            case 10:
              _context.next = 12;
              return (0, _waitForConnection2.default)(connection);

            case 12:
              resolve(connection);
              _context.next = 18;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context['catch'](0);

              reject(_context.t0);

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 15]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.default = requestConnection;