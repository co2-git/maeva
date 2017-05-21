'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getType;

var _String = require('./type/String');

var _String2 = _interopRequireDefault(_String);

var _Number = require('./type/Number');

var _Number2 = _interopRequireDefault(_Number);

var _Boolean = require('./type/Boolean');

var _Boolean2 = _interopRequireDefault(_Boolean);

var _Date = require('./type/Date');

var _Date2 = _interopRequireDefault(_Date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getType(type) {
  switch (type) {
    case String:
      return new _String2.default();
    case Number:
      return new _Number2.default();
    case Boolean:
      return new _Boolean2.default();
    case Date:
      return new _Date2.default();
    default:
      return type;
  }
}