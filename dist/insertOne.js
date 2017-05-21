'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _format = require('./format');

var _format2 = _interopRequireDefault(_format);

var _requestConnection = require('./requestConnection');

var _requestConnection2 = _interopRequireDefault(_requestConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var insertOne = function insertOne(model, document) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
      var connection, candidate, willInsert, set, results, inserted, didInsert;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.t0 = options.connection;

              if (_context.t0) {
                _context.next = 6;
                break;
              }

              _context.next = 5;
              return (0, _requestConnection2.default)();

            case 5:
              _context.t0 = _context.sent;

            case 6:
              connection = _context.t0;
              candidate = (0, _format2.default)(document, model);
              willInsert = (0, _get2.default)(model, 'options.will.insert');

              if (!(typeof willInsert === 'function')) {
                _context.next = 14;
                break;
              }

              _context.next = 12;
              return willInsert(candidate);

            case 12:
              set = _context.sent;

              if ((typeof set === 'undefined' ? 'undefined' : _typeof(set)) === 'object') {
                Object.assign(candidate, set);
              }

            case 14:
              _context.next = 16;
              return connection.driver.insertOne(candidate);

            case 16:
              results = _context.sent;
              inserted = (0, _format2.default)(results, _extends({}, model, connection.driver.model));
              didInsert = (0, _get2.default)(model, 'options.did.insert');

              if (!(typeof didInsert === 'function')) {
                _context.next = 22;
                break;
              }

              _context.next = 22;
              return didInsert(inserted);

            case 22:

              resolve(inserted);
              _context.next = 28;
              break;

            case 25:
              _context.prev = 25;
              _context.t1 = _context['catch'](0);

              reject(_context.t1);

            case 28:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 25]]);
    }));

    return function (_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.default = insertOne;