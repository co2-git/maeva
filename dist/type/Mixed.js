'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Type2 = require('./Type');

var _Type3 = _interopRequireDefault(_Type2);

var _getType = require('../getType');

var _getType2 = _interopRequireDefault(_getType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MaevaTypeMixed = function (_Type) {
  _inherits(MaevaTypeMixed, _Type);

  function MaevaTypeMixed() {
    _classCallCheck(this, MaevaTypeMixed);

    var _this = _possibleConstructorReturn(this, (MaevaTypeMixed.__proto__ || Object.getPrototypeOf(MaevaTypeMixed)).call(this));

    _this.name = 'Mixed';
    _this.types = [];

    for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
      types[_key] = arguments[_key];
    }

    _this.types = types.map(_getType2.default);
    return _this;
  }

  _createClass(MaevaTypeMixed, [{
    key: 'convert',
    value: function convert(array) {
      var _this2 = this;

      if (!Array.isArray(array)) {
        return array;
      }
      return array.map(function (value, index) {
        return _this2.types[index].convert(value);
      });
    }
  }, {
    key: 'validate',
    value: function validate(array) {
      var _this3 = this;

      if (!Array.isArray(array)) {
        return false;
      }
      return array.every(function (item, index) {
        return _this3.types[index].validate(item);
      });
    }
  }]);

  return MaevaTypeMixed;
}(_Type3.default);

exports.default = MaevaTypeMixed;