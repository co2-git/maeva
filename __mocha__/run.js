'use strict';

var _describeConnectLib = require('./describeConnectLib');

var _describeConnectLib2 = _interopRequireDefault(_describeConnectLib);

var _describeFormatLib = require('./describeFormatLib');

var _describeFormatLib2 = _interopRequireDefault(_describeFormatLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe */
describe('Maeva', function () {
  describe('connect', function () {
    (0, _describeConnectLib2.default)();
  });

  describe('format', function () {
    (0, _describeFormatLib2.default)();
  });
});