'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _Type2 = require('./Type');

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MaevaTypeNumber = function (_Type) {
  _inherits(MaevaTypeNumber, _Type);

  function MaevaTypeNumber() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MaevaTypeNumber);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MaevaTypeNumber.__proto__ || Object.getPrototypeOf(MaevaTypeNumber)).call.apply(_ref, [this].concat(args))), _this), _this.name = 'Number', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MaevaTypeNumber, [{
    key: 'validate',
    value: function validate(value) {
      return (0, _isNumber2.default)(value) && isFinite(value);
    }
  }, {
    key: 'convert',
    value: function convert(value) {
      return Number(value);
    }
  }]);

  return MaevaTypeNumber;
}(_Type3.default);

exports.default = MaevaTypeNumber;