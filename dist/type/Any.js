'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = require('./Type');

var _Type3 = _interopRequireDefault(_Type2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MaevaTypeAny = function (_Type) {
  _inherits(MaevaTypeAny, _Type);

  function MaevaTypeAny() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MaevaTypeAny);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MaevaTypeAny.__proto__ || Object.getPrototypeOf(MaevaTypeAny)).call.apply(_ref, [this].concat(args))), _this), _this.name = 'Any', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MaevaTypeAny, [{
    key: 'validate',
    value: function validate(value) {
      return typeof value === 'string';
    }
  }, {
    key: 'convert',
    value: function convert(value) {
      if (value === null || typeof value === 'undefined') {
        return '';
      }
      if (typeof value.toString === 'function') {
        return value.toString();
      }
      return value;
    }
  }]);

  return MaevaTypeAny;
}(_Type3.default);

exports.default = MaevaTypeAny;