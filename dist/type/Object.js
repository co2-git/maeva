'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _Type2 = require('./Type');

var _Type3 = _interopRequireDefault(_Type2);

var _getType = require('../getType');

var _getType2 = _interopRequireDefault(_getType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MaevaTypeObject = function (_Type) {
  _inherits(MaevaTypeObject, _Type);

  function MaevaTypeObject() {
    var shape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MaevaTypeObject);

    var _this = _possibleConstructorReturn(this, (MaevaTypeObject.__proto__ || Object.getPrototypeOf(MaevaTypeObject)).call(this));

    _this.name = 'Object';
    _this.shape = {};

    for (var _field in shape) {
      _this.shape[_field] = (0, _getType2.default)(shape[_field]);
    }
    return _this;
  }

  _createClass(MaevaTypeObject, [{
    key: 'convert',
    value: function convert(object) {
      if (!(0, _isObject2.default)(object)) {
        return object;
      }
      var converted = {};
      for (var _field2 in this.shape) {
        converted[_field2] = this.shape[_field2].convert(object[_field2]);
      }
      return converted;
    }
  }, {
    key: 'validate',
    value: function validate(object) {
      if (!(0, _isObject2.default)(object)) {
        return false;
      }
      var isValid = true;
      for (var _field3 in this.shape) {
        if (!this.shape[_field3].validate(object[_field3])) {
          isValid = false;
        }
      }
      return isValid;
    }
  }]);

  return MaevaTypeObject;
}(_Type3.default);

exports.default = MaevaTypeObject;