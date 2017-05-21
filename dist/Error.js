'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var ExtendableError = exports.ExtendableError = function (_extendableBuiltin2) {
  _inherits(ExtendableError, _extendableBuiltin2);

  function ExtendableError(message) {
    _classCallCheck(this, ExtendableError);

    var _this = _possibleConstructorReturn(this, (ExtendableError.__proto__ || Object.getPrototypeOf(ExtendableError)).call(this, message));

    _this.name = _this.constructor.name;
    _this.message = message;
    Error.captureStackTrace(_this, _this.constructor);
    return _this;
  }

  return ExtendableError;
}(_extendableBuiltin(Error));

var MaevaError = function (_ExtendableError) {
  _inherits(MaevaError, _ExtendableError);

  function MaevaError(code) {
    _classCallCheck(this, MaevaError);

    var _this2 = _possibleConstructorReturn(this, (MaevaError.__proto__ || Object.getPrototypeOf(MaevaError)).call(this, 'MaevaError'));

    _this2.debug = {};

    _this2.code = code;
    return _this2;
  }

  return MaevaError;
}(ExtendableError);

MaevaError.FORMAT_VALUE_ERROR = function (_MaevaError) {
  _inherits(_class, _MaevaError);

  function _class(field, value) {
    _classCallCheck(this, _class);

    var _this3 = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, 'FORMAT_VALUE_ERROR'));

    _this3.debug = { field: field, value: value };
    var strField = JSON.stringify(field.toJSON(), null, 2);
    var strValue = JSON.stringify(value, null, 2);
    _this3.message = 'FORMAT_VALUE_ERROR {field: ' + strField + ', value: ' + strValue + '}';
    return _this3;
  }

  return _class;
}(MaevaError);

MaevaError.SET_FIELD_ERROR = function (_MaevaError2) {
  _inherits(_class2, _MaevaError2);

  function _class2(fieldName, value, field, error) {
    _classCallCheck(this, _class2);

    var _this4 = _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).call(this, 'SET_FIELD_ERROR'));

    _this4.debug = { field: field, value: value };
    var strField = field ? JSON.stringify(field.toJSON(), null, 2) : 'undefined';
    var strValue = JSON.stringify(value, null, 2);
    _this4.message = 'SET_FIELD_ERROR {field: {' + fieldName + ': ' + strField + '},' + (' value: ' + strValue + '}');
    _this4.previousError = error;
    return _this4;
  }

  return _class2;
}(MaevaError);

exports.default = MaevaError;

var MaevaFieldError = exports.MaevaFieldError = function (_MaevaError3) {
  _inherits(MaevaFieldError, _MaevaError3);

  function MaevaFieldError() {
    _classCallCheck(this, MaevaFieldError);

    return _possibleConstructorReturn(this, (MaevaFieldError.__proto__ || Object.getPrototypeOf(MaevaFieldError)).apply(this, arguments));
  }

  return MaevaFieldError;
}(MaevaError);