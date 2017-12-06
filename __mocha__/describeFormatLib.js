'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _format = require('../__dist__/format');

var _format2 = _interopRequireDefault(_format);

var _MaevaModel = require('../__dist__/defs/MaevaModel');

var _MaevaModel2 = _interopRequireDefault(_MaevaModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var describeFormatLib = function describeFormatLib() {
  return describe('Format', function () {
    describe('Defaults', function () {
      it('should apply default literal value', function () {
        var model = new _MaevaModel2.default({
          name: 'foo',
          fields: {
            score: Number
          },
          defaults: {
            score: 100
          }
        });
        var candidate = (0, _format2.default)({}, model);
        console.log({ candidate: candidate });
        (0, _chai.expect)(candidate.score).to.equal(100);
      });
    });
  });
}; /* global describe it */
exports.default = describeFormatLib;