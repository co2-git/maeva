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

var MaevaTypeDate = function (_Type) {
  _inherits(MaevaTypeDate, _Type);

  function MaevaTypeDate() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MaevaTypeDate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MaevaTypeDate.__proto__ || Object.getPrototypeOf(MaevaTypeDate)).call.apply(_ref, [this].concat(args))), _this), _this.name = 'Date', _this.flags = ['date'], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MaevaTypeDate, [{
    key: 'validate',
    value: function validate(value) {
      return value instanceof Date && value.toString() !== 'Invalid Date';
    }
  }, {
    key: 'convert',
    value: function convert(value) {
      try {
        var date = new Date(value);

        if (this.validate(date)) {
          return date;
        }
        return value;
      } catch (error) {
        return value;
      }
    }
  }]);

  return MaevaTypeDate;
}(_Type3.default);

exports.default = MaevaTypeDate;