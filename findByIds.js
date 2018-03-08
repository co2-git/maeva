'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _getType = require('../types/getType');

var _getType2 = _interopRequireDefault(_getType);

var _link = require('../types/link');

var _link2 = _interopRequireDefault(_link);

var _requestConnection = require('../connect/requestConnection');

var _requestConnection2 = _interopRequireDefault(_requestConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var findByIds = function findByIds(model, _ids) {
  var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var options, linkType, ids, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, id, results;

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
              linkType = (0, _getType2.default)((0, _link2.default)());
              _context.next = 11;
              return Promise.all(_ids.map(function (_id) {
                return linkType.convert(_id, options);
              }));

            case 11:
              ids = _context.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 15;


              for (_iterator = ids[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                id = _step.value;

                linkType.validate(id, options);
              }

              _context.next = 23;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context['catch'](15);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 23:
              _context.prev = 23;
              _context.prev = 24;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 26:
              _context.prev = 26;

              if (!_didIteratorError) {
                _context.next = 29;
                break;
              }

              throw _iteratorError;

            case 29:
              return _context.finish(26);

            case 30:
              return _context.finish(23);

            case 31:
              _context.next = 33;
              return options.connection.connector.actions.findByIds(ids, model);

            case 33:
              results = _context.sent;


              resolve(results);
              _context.next = 40;
              break;

            case 37:
              _context.prev = 37;
              _context.t1 = _context['catch'](0);

              reject(_context.t1);

            case 40:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 37], [15, 19, 23, 31], [24,, 26, 30]]);
    }));

    return function (_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.default = findByIds;
