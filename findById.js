'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _requestConnection = require('../connect/requestConnection');

var _requestConnection2 = _interopRequireDefault(_requestConnection);

var _getType = require('../types/getType');

var _getType2 = _interopRequireDefault(_getType);

var _link = require('../types/link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var findById = function findById(model, _id) {
  var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var options, id, results;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              options = (0, _cloneDeep2.default)(_options);

              if (options.connection) {
                _context.next = 6;
                break;
              }

              _context.next = 5;
              return (0, _requestConnection2.default)();

            case 5:
              options.connection = _context.sent;

            case 6:
              if (options.connection.connector) {
                _context.next = 8;
                break;
              }

              throw new Error('Connection has no connector');

            case 8:
              id = (0, _getType2.default)((0, _link2.default)()).convert(_id, options);


              (0, _getType2.default)((0, _link2.default)()).validate(id, options);

              _context.next = 12;
              return options.connection.connector.actions.findById(id, model);

            case 12:
              results = _context.sent;


              resolve(results);
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context['catch'](0);

              reject(_context.t0);

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 16]]);
    }));

    return function (_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.default = findById;
